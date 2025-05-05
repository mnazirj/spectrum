<template>
  <div class="d-flex flex-column gap-3">
    <Navbar />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "@/components/client/Navbar.vue";
import Footer from "@/components/client/Footer.vue";
</script>
