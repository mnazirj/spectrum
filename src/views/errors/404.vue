<template>
  <div class="container">
    <div class="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div class="text-center">
        <h1 class="logo-text">404 :(</h1>
        <h4 class="font-avg">Looks like you are lost</h4>
        <Button label="Go home" class="w-100 mt-2 rounded-0 text-decoration-none" icon="fas fa-home" as="a" href="/home" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "primevue/button";
</script>
