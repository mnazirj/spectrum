<template>
  <div class="container">
    <div class="d-flex flex-row justify-content-between align-items-center">
      <h2 class="font-avg text-uppercase">{{ $t("client.brands") }}</h2>
      <a href="#" class="text-black font-medium" style="font-size: 18px">{{ $t("client.view") }}</a>
    </div>
    <div class="row">
      <div class="col-lg-2 col-md-2 col-6" v-for="item in brands" :key="item">
        <div class="bg-zinc py-5 shadow-3 cursor-pointer">
          <h4 class="font-avg text-white text-center">
            <a :href="`/shop/brand/${item.slug}`" class="text-decoration-none text-white">{{ item.title }}</a>
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ brands: Array });
</script>
