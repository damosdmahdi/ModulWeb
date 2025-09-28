<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header Halaman Utama-->
    <section class="text-center max-w-2xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
        Mata Kuliah Tersedia
      </h2>
      <p class="mt-4 text-lg text-slate-600">
        Pilih mata kuliah untuk melihat materi yang tersedia. Gunakan filter untuk mencari
        berdasarkan semester.
      </p>
    </section>

    <!-- Search Bar -->
    <section class="mt-12 max-w-xl mx-auto">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari mata kuliah..."
          class="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </section>

    <!-- Filter Semester-->
    <section class="mt-8">
      <div class="flex items-center space-x-2 sm:space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        <button
          @click="filterBySemester(0)"
          :class="
            activeSemester === 0
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-slate-700 hover:bg-slate-100'
          "
          class="px-4 py-2 rounded-full font-semibold transition-colors text-sm sm:text-base flex-shrink-0"
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
          class="px-4 py-2 rounded-full font-semibold transition-colors text-sm sm:text-base flex-shrink-0"
        >
          Semester {{ semester }}
        </button>
      </div>
    </section>

    <!-- Daftar Kartu Mata Kuliah-->
    <section class="mt-10">
      <div v-if="isLoading" class="text-center py-10">
        <p class="text-slate-600">Memuat data mata kuliah dari Google Drive...</p>
      </div>
      <div
        v-else-if="filteredCourses.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
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
        <p>Tidak ada mata kuliah yang cocok dengan pencarian Anda.</p>
      </div>
    </section>
  </div>
</template>

<script setup>
// Bagian <script> tidak perlu diubah sama sekali JANGAN by Adri
import { ref, onMounted, computed } from 'vue'

const allCourses = ref([])
const isLoading = ref(true)
const activeSemester = ref(0)
const searchQuery = ref('')

async function fetchAllCourses() {
  const apiUrl =
    'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhNcfvUH_JYRAMs228_dLvUSPplNJx8YntTUvhc47fTQh-ju_qh3daxKtgXnErDNmpGNsy7y5eoGt2LTwVRBUGFbd5XzSftGc9BuwgUokdRV7aW2PqWpmYmaGObOkAeJCL-BCDhJmmD6J3bDfo-eSbJ6vscTj9e8gl8PCc7iw0YE3GNeVKMmxIRhD7O6qzoRAi3YQfKrayyTcjY7XKkiw9iWzOPx8kwr-9wCxezxzZLll4WxqKnWlnGLxeDAbiPqF9XXGWtLlZnuazBIrKhF8gx8rYy-Q&lib=MTTIVDwz9uTbOcxgK8-BbKRpcabFoEc7r'
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

function filterBySemester(semesterNumber) {
  activeSemester.value = semesterNumber
}

const availableSemesters = computed(() => {
  const semesters = allCourses.value.map((course) => course.semester)
  return [...new Set(semesters)].sort((a, b) => a - b)
})

const filteredCourses = computed(() => {
  let coursesBySemester = []
  if (activeSemester.value === 0) {
    coursesBySemester = allCourses.value
  } else {
    coursesBySemester = allCourses.value.filter(
      (course) => course.semester === activeSemester.value,
    )
  }
  if (searchQuery.value.trim() !== '') {
    return coursesBySemester.filter((course) =>
      course.title.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
  }
  return coursesBySemester
})
</script>

<style>
/* Menambahkan utility untuk menyembunyikan scrollbar agar terlihat lebih rapi */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
