<template>
  <header class="bg-slate-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center py-6">
        <div class="flex items-center space-x-3">
          <a href="#" class="flex items-center space-x-3">
            <div class="bg-indigo-600 p-2 rounded-lg">
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h7"
                ></path>
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-slate-800">ModuleHub</h1>
              <p class="text-xs text-slate-500">Computer Science Modules</p>
            </div>
          </a>
        </div>

        <nav class="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
          <a href="#" class="hover:text-indigo-600 transition-colors">Home</a>
          <a href="#" class="hover:text-indigo-600 transition-colors">About</a>
          <a href="#" class="hover:text-indigo-600 transition-colors">Contact</a>
        </nav>

        <div class="md:hidden">
          <button class="p-2 rounded-md text-slate-600 hover:bg-slate-200 hover:text-slate-800">
            <svg
              class="w-6 h-6"
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
