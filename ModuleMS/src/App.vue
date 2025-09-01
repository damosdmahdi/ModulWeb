<script setup>
// Impor komponen layout global
import NavbarSection from './components/NavbarSection.vue'
import FooterSection from './components/FooterSection.vue'
</script>
<template>
  <div class="bg-slate-50 min-h-screen font-sans flex flex-col">
    <NavbarSection />

    <main class="flex-grow">
      <router-view></router-view>
    </main>
    <FooterSection />
  </div>
</template>
