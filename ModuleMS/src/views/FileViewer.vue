<template>
  <!-- Layout utama yang mengisi seluruh tinggi layar -->
  <div class="h-screen flex flex-col bg-gray-800 text-white">
    <!-- Header tipis di bagian atas untuk navigasi dan judul -->
    <header class="flex-shrink-0 bg-gray-900 shadow-md z-10">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Judul Dokumen -->
          <div class="flex items-center space-x-3 overflow-hidden">
            <svg
              class="w-6 h-6 flex-shrink-0 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              ></path>
            </svg>
            <h1 class="text-lg font-semibold truncate" :title="docTitle">
              Pratinjau: {{ docTitle }}
            </h1>
          </div>

          <!-- Tombol Aksi -->
          <div class="flex items-center space-x-4">
            <a
              :href="docUrl"
              download
              class="hidden sm:flex items-center space-x-2 text-sm bg-indigo-600 hover:bg-indigo-700 px-3 py-2 rounded-md transition-colors"
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
            <button
              @click="goBack"
              class="flex items-center space-x-2 text-sm bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-md transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                ></path>
              </svg>
              <span>Kembali</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Area utama untuk menampilkan iframe, yang akan mengisi sisa ruang -->
    <main class="flex-grow bg-gray-200">
      <iframe
        v-if="docUrl"
        :src="docUrl"
        class="w-full h-full border-none"
        title="File Viewer"
      ></iframe>
      <div v-else class="flex items-center justify-center h-full text-gray-500">
        Memuat dokumen...
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const docUrl = ref('')
const docTitle = ref('Memuat...')

onMounted(() => {
  docUrl.value = route.query.url || ''
  docTitle.value = route.query.title || 'Dokumen Tanpa Judul'
})

const goBack = () => {
  router.back()
}
</script>
