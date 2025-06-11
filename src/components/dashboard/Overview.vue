<template>
  <div>
    <div
      class="d-flex justify-content-evenly flex-wrap w-100"
      id="card-container"
    >
      <!-- Card 1 -->
      <Card
        :value="{
          value: 100,
          fontSize: '1.8rem',
          textWrap: false,
          bold: true,
          withComma: true,
        }"
        :label="{
          value: 'New Customers',
          fontSize: '1rem',
          textWrap: true,
          bold: false,
        }"
        :icon="{
          value: 'pi pi-user',
          size: '6rem',
        }"
        :style="{ width: '14rem', height: '10rem' }"
      />
      <!-- Card 2 -->
      <Card
        :value="{
          value: 3000,
          fontSize: '1.8rem',
          textWrap: false,
          bold: true,
          withComma: true,
        }"
        :label="{
          value: 'Total User',
          fontSize: '1.2rem',
          textWrap: true,
          bold: false,
        }"
        :icon="{ value: 'pi pi-users', size: '6rem' }"
        :style="{ width: '14rem', height: '10rem' }"
      />
      <!-- Card 3 -->
      <Card
        :value="{
          value: 250,
          fontSize: '1.8rem',
          textWrap: false,
          bold: true,
        }"
        :label="{
          value: 'Orders Count',
          fontSize: '1.2rem',
          textWrap: true,
          bold: false,
        }"
        :icon="{ value: 'pi pi-box', size: '5rem' }"
        :style="{ width: '14rem', height: '10rem' }"
      />
      <!-- Card 4 -->
      <Card
        :value="{
          value: '50',
          fontSize: '2rem',
          textWrap: false,
          bold: true,
          withComma: true,
          symbol: '$',
        }"
        :label="{
          value: 'AVO',
          fontSize: '1.5rem',
          textWrap: false,
          bold: false,
        }"
        :icon="{ value: 'pi pi-dollar', size: '5rem' }"
        :style="{ width: '14rem', height: '10rem' }"
      />
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
