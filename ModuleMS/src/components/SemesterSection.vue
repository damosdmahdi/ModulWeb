<template>
  <main class="bg-slate-50 py-20 md:py-28">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-2xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Select Your Semester
        </h2>
        <p class="mt-4 text-lg text-slate-600">
          Choose your current semester to access learning modules and course materials for Computer
          Science program
        </p>
      </div>

      <!-- Semester Cards Grid -->
      <div class="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Setiap kartu sekarang adalah link (<a> tag) -->
        <a
          v-for="semester in semesters"
          :key="semester.id"
          :href="`/semester/${semester.id}`"
          class="block bg-white p-6 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
        >
          <div class="flex justify-between items-start">
            <!-- Nomor Semester dengan Latar Belakang Berwarna -->
            <div
              class="w-10 h-10 flex items-center justify-center rounded-lg font-bold text-white text-lg"
              :class="semester.color"
            >
              {{ semester.id }}
            </div>
            <!-- Ikon Panah -->
            <svg
              class="w-6 h-6 text-slate-400 group-hover:text-slate-600 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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
            <!-- Judul semester tetap ada -->
            <h3 class="font-bold text-slate-800">Semester {{ semester.id }}</h3>
            <!-- DESKRIPSI DIHILANGKAN DARI SINI -->
          </div>
          <div class="mt-6 flex items-center space-x-2 text-sm text-slate-500">
            <!-- Ikon Buku/Mata Kuliah -->
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v11.494m-5.75-8.494l-2.25 5.25L12 21.75l7-4.25-2.25-5.25-4.75 2.75-4.75-2.75z"
              ></path>
            </svg>
            <span>{{ semester.courseCount }} Courses</span>
          </div>
        </a>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

// Data untuk setiap kartu semester
// Properti 'description' telah dihapus untuk menjaga data tetap bersih
const semesters = ref([
  { id: 1, title: 'Foundation of Computer Science', courseCount: 8, color: 'bg-indigo-500' },
  { id: 2, title: 'Programming Fundamentals', courseCount: 7, color: 'bg-green-500' },
  { id: 3, title: 'Data Structures & Algorithms', courseCount: 8, color: 'bg-purple-500' },
  { id: 4, title: 'Object-Oriented Programming', courseCount: 7, color: 'bg-orange-500' },
  { id: 5, title: 'Database & Web Development', courseCount: 8, color: 'bg-red-500' },
  { id: 6, title: 'Software Engineering', courseCount: 7, color: 'bg-teal-500' },
  { id: 7, title: 'Advanced Topics & Specialization', courseCount: 6, color: 'bg-fuchsia-600' },
  { id: 8, title: 'Final Project & Thesis', courseCount: 4, color: 'bg-rose-500' },
])
</script>
