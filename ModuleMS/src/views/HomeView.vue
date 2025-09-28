<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header Halaman Utama -->
    <section class="text-center max-w-2xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
        Mata Kuliah Tersedia
      </h2>
      <p class="mt-4 text-lg text-slate-600">
        Pilih mata kuliah untuk melihat materi yang tersedia. Gunakan filter untuk mencari
        berdasarkan semester.
      </p>
    </section>

    <!-- Filter Semester -->
    <section class="mt-12 flex justify-center items-center space-x-2 sm:space-x-4">
      <button
        @click="filterBySemester(0)"
        :class="
          activeSemester === 0
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-slate-700 hover:bg-slate-100'
        "
        class="px-4 py-2 rounded-full font-semibold transition-colors text-sm sm:text-base"
      >
        Semua
      </button>
      <button
        v-for="semester in availableSemesters"
        :key="semester"
        @click="filterBySemester(semester)"
        :class="
          activeSemester === semester
            ? 'bg-indigo-600 text-white'
            : 'bg-white text-slate-700 hover:bg-slate-100'
        "
        class="px-4 py-2 rounded-full font-semibold transition-colors text-sm sm:text-base"
      >
        Semester {{ semester }}
      </button>
    </section>

    <!-- Daftar Kartu Mata Kuliah -->
    <section class="mt-10">
      <div v-if="isLoading" class="text-center py-10">
        <p class="text-slate-600">Memuat data mata kuliah dari Google Drive...</p>
      </div>
      <div
        v-else-if="filteredCourses.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <!-- Setiap kartu sekarang mengarah ke /course/:id -->
        <router-link
          v-for="course in filteredCourses"
          :key="course.id"
          :to="`/course/${course.id}`"
          class="block bg-white p-6 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
        >
          <div class="flex justify-between items-start">
            <span
              class="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full"
              >Semester {{ course.semester }}</span
            >
            <svg
              class="w-6 h-6 text-slate-400 group-hover:text-slate-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              ></path>
            </svg>
          </div>
          <div class="mt-4">
            <h3 class="text-lg font-bold text-slate-800">{{ course.title }}</h3>
          </div>
          <div class="mt-6 flex items-center space-x-2 text-sm text-slate-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              ></path>
            </svg>
            <span>{{ course.fileCount }} Materi</span>
          </div>
        </router-link>
      </div>
      <div v-else class="text-center mt-10 text-slate-500">
        <p>Tidak ada mata kuliah untuk semester yang dipilih.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const allCourses = ref([])
const isLoading = ref(true)
const activeSemester = ref(0) // 0 untuk "Semua"

// Ambil data semua mata kuliah dari API
async function fetchAllCourses() {
  // GANTI DENGAN URL WEB APP ANDA YANG BARU
  const apiUrl =
    'https://script.google.com/macros/s/AKfycbwRjlb2drYEagj2XWdIAGV9GEm7SKIjDczn-Nwgxs8nS79pucKoD9NXpNBby87AJ0eL/exec' // Memanggil API dalam "Mode 1" (tanpa parameter)

  try {
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (data.error) throw new Error(data.error)
    allCourses.value = data
  } catch (error) {
    console.error('Gagal mengambil daftar mata kuliah:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchAllCourses)

// Fungsi untuk mengubah filter aktif
function filterBySemester(semesterNumber) {
  activeSemester.value = semesterNumber
}

// Membuat daftar semester yang unik untuk tombol filter, secara dinamis
const availableSemesters = computed(() => {
  const semesters = allCourses.value.map((course) => course.semester)
  return [...new Set(semesters)].sort((a, b) => a - b)
})

// Menyaring daftar mata kuliah berdasarkan filter yang aktif
const filteredCourses = computed(() => {
  if (activeSemester.value === 0) {
    return allCourses.value // Tampilkan semua jika filter "Semua" aktif
  }
  return allCourses.value.filter((course) => course.semester === activeSemester.value)
})
</script>
