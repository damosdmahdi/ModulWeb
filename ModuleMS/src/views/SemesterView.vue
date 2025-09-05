<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Tampilan Loading saat data diambil dari Google Drive -->
    <div v-if="isLoading" class="text-center py-20">
      <p class="text-lg text-slate-600">Mengambil data dari Google Drive...</p>
    </div>

    <!-- Tampilan Konten setelah data dimuat -->
    <div v-else-if="courses && courses.length > 0">
      <section class="mb-12">
        <nav class="text-sm font-medium text-slate-500 mb-4">
          <router-link to="/" class="hover:text-indigo-600">Home</router-link>
          <span class="mx-2">&gt;</span>
          <span>Semester {{ semesterId }}</span>
        </nav>
        <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Materi Semester {{ semesterId }}
        </h1>
      </section>

      <!-- Daftar Mata Kuliah & File (Sekarang sepenuhnya otomatis) -->
      <section class="space-y-10">
        <div v-for="course in courses" :key="course.code">
          <h2 class="text-2xl font-bold text-slate-800 pb-2 border-b border-slate-200 mb-6">
            {{ course.title }}
          </h2>
          <ul class="space-y-4">
            <li v-for="file in course.files" :key="file.id">
              <div
                class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex items-center justify-between flex-wrap gap-4"
              >
                <div class="flex items-center space-x-4">
                  <div
                    class="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-slate-100 rounded-lg"
                  >
                    <svg
                      v-html="getFileIcon(file.type)"
                      class="w-6 h-6 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    ></svg>
                  </div>
                  <div>
                    <p class="font-semibold text-slate-800">{{ file.name }}</p>
                    <p class="text-sm text-slate-500 uppercase">
                      {{ getFileType(file.type) }} • {{ file.size }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center space-x-3">
                  <router-link
                    :to="{ path: '/view-file', query: { url: file.path, title: file.name } }"
                    class="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                    <span>Lihat File</span>
                  </router-link>
                  <a
                    :href="file.path"
                    download
                    class="flex items-center space-x-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      ></path>
                    </svg>
                    <span>Unduh</span>
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>

    <div v-else class="text-center py-20">
      <h1 class="text-2xl font-bold text-slate-700">Materi tidak ditemukan</h1>
      <p class="text-slate-500 mt-2">
        Pastikan folder semester ada di Google Drive dan tidak kosong.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const semesterId = ref(route.params.id)
const courses = ref([])
const isLoading = ref(true)

// Fungsi untuk mengambil data dari Google Apps Script
async function fetchFilesFromGoogleDrive() {
  // PENTING: GANTI DENGAN URL WEB APP ANDA YANG SUDAH DI-DEPLOY
  const baseApiUrl =
    'https://script.google.com/macros/s/AKfycbzjN-qers5XwiiklLIER4zAUg5bfovFjU8lKXmNZX4X845lbPCB4ho3_AGQru8heKjB/exec'

  // Menambahkan parameter semester ke URL
  const fullApiUrl = `${baseApiUrl}?semester=${semesterId.value}`

  try {
    const response = await fetch(fullApiUrl)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

    const data = await response.json()
    if (data.error) throw new Error(data.error)

    courses.value = data
  } catch (error) {
    console.error('Gagal mengambil data dari Google Drive Script:', error)
    courses.value = [] // Kosongkan data jika terjadi error
  } finally {
    isLoading.value = false
  }
}

// Panggil fungsi ini saat komponen dimuat
onMounted(() => {
  fetchFilesFromGoogleDrive()
})

// Helper untuk mengubah tipe file (MIME type) menjadi teks singkat
const mimeTypeToShort = {
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
  'application/zip': 'zip',
}
const getFileType = (mime) => mimeTypeToShort[mime] || 'file'

// Helper untuk memilih ikon SVG berdasarkan tipe file
const fileIcons = {
  pdf: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>`,
  docx: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>`,
  pptx: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>`,
  zip: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4m16 0l-4 4m4-4l-4-4M4 12l4 4M4 12l4-4"></path>`,
  default: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H7z"></path>`,
}
const getFileIcon = (mime) => {
  const type = getFileType(mime)
  return fileIcons[type] || fileIcons.default
}
</script>
