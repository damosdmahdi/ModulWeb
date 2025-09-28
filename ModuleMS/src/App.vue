<template>
  <div class="bg-slate-50 min-h-screen font-sans">
    <!-- Jika labelnya 'default', tampilkan layout lengkap -->
    <div v-if="$route.meta.layout === 'default'" class="flex flex-col min-h-screen">
      <NavbarSection />
      <main class="flex-grow">
        <router-view />
      </main>
      <FooterSection />
    </div>

    <div v-else-if="$route.meta.layout === 'viewer'" class="h-screen">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import NavbarSection from './components/NavbarSection.vue'
import FooterSection from './components/FooterSection.vue'
</script>
