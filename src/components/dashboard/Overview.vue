<template>
  <div>
    <div class="d-flex justify-content-evenly flex-wrap w-100" id="card-container">
      <Card value="100$" label="Card1" icon="pi pi-users" />
      <Card value="100$" label="Card1" icon="pi pi-users" />
      <Card value="100$" label="Card1" icon="pi pi-users" />
      <Card value="100$" label="Card1" icon="pi pi-users" />
    </div>
    <div class="px-2">
      <Charts />
    </div>
  </div>
</template>

<script setup>
import Card from "@/components/dashboard/Card.vue";
import Charts from "./Charts.vue";
</script>
