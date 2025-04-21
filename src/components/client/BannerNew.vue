<template>
  <div class="container">
    <div
      class="d-flex flex-lg-row flex-column flex-column-reverse align-items-center justify-content-center"
      :class="{
        'flex-lg-row-reverse': isReversed,
        'flex-md-row-reverse': isReversed,
      }"
    >
      <div class="col-lg-4 col-md-4 col-12">
        <div
          class="d-flex flex-column gap-lg-4 gap-md-4 gap-1 text-lg-start text-md-start text-center"
        >
          <div>
            <h1 class="text-uppercase font-avg" style="font-size: 50px">
              {{ title }}
            </h1>
          </div>
          <div class="text-lg-start text-md-start text-center">
            <p class="text-black">
              {{ subtitle }}
            </p>
            <Button
              label="Shop Now"
              outlined
              severity="contrast"
              class="rounded-0 px-5"
            />
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-12">
        <div>
          <img :src="src" width="648" class="img-fluid" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "primevue/button";

defineProps({
  title: String,
  subtitle: String,
  link: String,
  src: String,
  hasImage: Boolean,
  isReversed: Boolean,
});
</script>
