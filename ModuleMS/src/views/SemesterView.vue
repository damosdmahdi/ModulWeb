<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Tampilkan konten hanya jika data semester ditemukan -->
    <div v-if="semesterData">
      <!-- Section 1: Header Halaman -->
      <section class="mb-12">
        <nav class="text-sm font-medium text-slate-500 mb-4">
          <router-link to="/" class="hover:text-indigo-600">Home</router-link>
          <span class="mx-2">&gt;</span>
          <span>Semester {{ semesterData.id }}</span>
        </nav>
        <h1 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Materi Semester {{ semesterData.id }}: {{ semesterData.title }}
        </h1>
        <p class="mt-4 text-lg text-slate-600 max-w-3xl">
          Unduh materi pembelajaran, modul, dan tugas untuk semua mata kuliah di semester ini.
        </p>
      </section>

      <!-- Section 2: Daftar Mata Kuliah & File -->
      <section class="space-y-10">
        <!-- Loop untuk setiap mata kuliah dalam data semester -->
        <div v-for="course in semesterData.courses" :key="course.code">
          <h2 class="text-2xl font-bold text-slate-800 pb-2 border-b border-slate-200 mb-6">
            {{ course.title }}
          </h2>
          <!-- Daftar file untuk mata kuliah ini -->
          <ul class="space-y-4">
            <li v-for="file in course.files" :key="file.name">
              <div
                class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex items-center justify-between"
              >
                <div class="flex items-center space-x-4">
                  <!-- Ikon File Dinamis -->
                  <div
                    class="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-slate-100 rounded-lg"
                  >
                    <svg
                      v-html="getFileIcon(file.type)"
                      class="w-6 h-6 text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    ></svg>
                  </div>
                  <!-- Info File -->
                  <div>
                    <p class="font-semibold text-slate-800">{{ file.name }}</p>
                    <p class="text-sm text-slate-500 uppercase">
                      {{ file.type }} • {{ file.size }}
                    </p>
                  </div>
                </div>
                <!-- Tombol Download -->
                <a
                  :href="file.path"
                  download
                  class="flex items-center space-x-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
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
            </li>
          </ul>
        </div>
      </section>
    </div>

    <!-- Tampilan jika data semester tidak ditemukan (misal: user ke /semester/99) -->
    <div v-else class="text-center py-20">
      <h1 class="text-2xl font-bold text-slate-700">Semester tidak ditemukan</h1>
      <p class="text-slate-500 mt-2">Materi untuk semester ini belum tersedia.</p>
      <router-link to="/" class="text-indigo-600 hover:underline mt-6 inline-block">
        &larr; Kembali ke halaman utama
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// --- INI ADALAH "DATABASE MINI" KITA ---
// Data untuk semua semester disimpan di sini. Kuncinya adalah ID semester.
// INGAT: Taruh file-file Anda di dalam folder `public/files/`
const allSemestersData = {
  1: {
    id: 1,
    title: 'Foundation of Computer Science',
    courses: [
      {
        code: 'CS-101',
        title: 'Dasar-Dasar Pemrograman',
        files: [
          {
            name: 'Modul 01 - Pengenalan Logika.pdf',
            type: 'pdf',
            size: '1.5 MB',
            path: '/files/Modul_01.pdf',
          },
          {
            name: 'Tugas 01 - Flowchart.docx',
            type: 'docx',
            size: '50 KB',
            path: '/files/Tugas_01.docx',
          },
        ],
      },
      {
        code: 'CS-102',
        title: 'Pengantar Sistem Digital',
        files: [
          {
            name: 'Slide 01 - Gerbang Logika.pptx',
            type: 'pptx',
            size: '2.1 MB',
            path: '/files/Slide_01.pptx',
          },
        ],
      },
    ],
  },
  3: {
    id: 3,
    title: 'Data Structures & Algorithms',
    courses: [
      {
        code: 'CS-301',
        title: 'Struktur Data & Algoritma',
        files: [
          {
            name: 'Modul 01 - Pengenalan Algoritma.pdf',
            type: 'pdf',
            size: '1.2 MB',
            path: '/files/Modul_01.pdf',
          },
          {
            name: 'Source Code Latihan.zip',
            type: 'zip',
            size: '4.5 MB',
            path: '/files/Source_Code.zip',
          },
        ],
      },
      {
        code: 'CS-303',
        title: 'Basis Data',
        files: [
          {
            name: 'Slide 01 - Konsep Database.pptx',
            type: 'pptx',
            size: '3.1 MB',
            path: '/files/Slide_01.pptx',
          },
        ],
      },
    ],
  },
  // --- Anda bisa tambahkan data untuk semester 2, 4, 5, dst. di sini ---
}
// --- AKHIR DARI DATABASE MINI ---

// --- LOGIKA KOMPONEN ---
const route = useRoute()
const semesterData = ref(null) // Awalnya data kosong

onMounted(() => {
  // 1. Ambil ID dari URL (misal: '3')
  const currentId = route.params.id
  // 2. Cari data yang cocok di "database mini" kita
  semesterData.value = allSemestersData[currentId] || null
})

// Helper untuk menampilkan ikon SVG berdasarkan tipe file
const fileIcons = {
  pdf: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>`,
  docx: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>`,
  pptx: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>`,
  zip: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4m16 0l-4 4m4-4l-4-4M4 12l4 4M4 12l4-4"></path>`,
  default: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>`,
}
const getFileIcon = (type) => fileIcons[type] || fileIcons.default
</script>
