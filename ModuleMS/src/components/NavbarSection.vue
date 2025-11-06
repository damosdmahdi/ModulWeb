<template>
  <header class="bg-slate-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-6">
        <div classs="flex items-center space-x-3">
          <a href="#" class="flex items-center space-x-3">
            <!-- 
              LOGO BARU: 
              Menggunakan <img> yang menunjuk ke folder /public.
              Pastikan nama file di "src" sudah benar.
            -->
            <img
              src="/hmik_logo.png"
              alt="HMIK Module Logo"
              class="w-10 h-10 rounded-lg object-cover"
            />
            <div>
              <!-- NAMA BARU -->
              <h1 class="text-xl font-bold text-slate-800">HMIK Module</h1>
              <p class="text-xs text-slate-500">Computer Science Modules</p>
            </div>
          </a>
        </div>

        <!-- Navigation Links (Desktop) -->

        <!-- Hamburger Menu Icon (Mobile) -->
        <div classs="md:hidden">
          <button classs="p-2 rounded-md text-slate-600 hover:bg-slate-200 hover:text-slate-800">
            <svg
              classs="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
// Tidak ada logika yang perlu diubah
</script>
