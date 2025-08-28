<template>
  <footer class="bg-slate-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="border-t border-slate-200 py-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <!-- Logo & Brand Name -->
          <div class="flex items-center space-x-3">
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
            <h1 class="text-xl font-bold text-slate-800">ModuleHub</h1>
          </div>

          <!-- Footer Links & Copyright -->
          <div
            class="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-slate-500"
          >
            <a href="#" class="hover:text-indigo-600 transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-indigo-600 transition-colors">Terms of Service</a>
            <span>© 2025 Computer Science Department</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
