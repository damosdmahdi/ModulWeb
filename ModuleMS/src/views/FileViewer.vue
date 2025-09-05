<template>
  <div class="flex flex-col h-full bg-gray-200" style="font-family: 'Inter', sans-serif">
    <!-- Header dengan Judul dan Tombol Kembali -->
    <header class="flex-shrink-0 bg-white shadow-md p-4 flex justify-between items-center">
      <h2 class="text-lg font-semibold text-gray-800 truncate pr-4">
        Pratinjau: {{ fileTitle || 'Memuat...' }}
      </h2>
      <button
        @click="goBack"
        class="flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-lg transition-colors"
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        <span>Kembali</span>
      </button>
    </header>

    <!-- Area Konten Iframe -->
    <div class="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-100 overflow-y-auto">
      <div v-if="fileUrl" class="w-full h-full bg-white rounded-lg shadow-inner">
        <iframe :src="fileUrl" class="w-full h-full border-0"></iframe>
      </div>
      <div v-else class="text-center p-10">
        <p>URL file tidak valid atau tidak ditemukan.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const fileUrl = ref(null)
const fileTitle = ref('')

onMounted(() => {
  // Ambil URL dan judul dari query parameter di URL
  fileUrl.value = route.query.url
  fileTitle.value = route.query.title
})

// Fungsi untuk kembali ke halaman sebelumnya
function goBack() {
  router.go(-1)
}
</script>
