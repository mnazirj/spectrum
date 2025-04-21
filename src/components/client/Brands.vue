<template>
  <div class="container">
    <div class="d-flex flex-row justify-content-between align-items-center">
      <h2 class="font-avg text-uppercase">Discover the Brands</h2>
      <a href="#" class="text-black font-medium" style="font-size: 18px"
        >View All Brands</a
      >
    </div>
    <div class="row">
      <div class="col-lg-2 col-md-2 col-6" v-for="item in 6" :key="item">
        <img src="https://picsum.photos/id/106/200/336" class="img-fluid" />
      </div>
    </div>
  </div>
</template>
