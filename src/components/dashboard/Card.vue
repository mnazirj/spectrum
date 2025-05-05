<template>
  <div class="card rounded-3 shadow-3 my-2">
    <div
      class="d-flex justify-content-center align-items-center flex-wrap  rounded-3 h-100 p-2 bg-main text-white"
    >
      <div class="w-100 d-flex justify-content-center">
        <div class="w-50 d-flex justify-content-center align-items-center">
          <i :class="[props.icon, 'icon']" :style="{ fontSize: '6rem' }" />
        </div>

        <div
          class="w-50 d-flex flex-wrap justify-content-center align-items-center"
        >
          <div class="w-100 d-flex justify-content-center my-1">
            <span class="fs-2" :style="{ fontWeight: 'bold' }">{{
              props.value
            }}</span>
          </div>
          <div class="w-100 d-flex justify-content-center my-1">
            <span class="fs-4">{{ props.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  value: {
    type: String,
    required: true,
    default: "",
  },
  icon: {
    type: String,
    required: true,
    default: "pi pi-user",
  },
  label: {
    type: String,
    required: true,
    default: "Default",
  },
});
</script>

<style scoped>
.card {
  width: 14rem;
  height: 10rem;
  transition: all 0.2s ease;
  transform-origin: center;
}
@media (min-width: 1024px) {
  /* .card {
    width: 16rem ;
  } */
  .icon {
    font-size: 3.8rem;
  }
}
@media (max-width: 1024px) {
  /* .card {
    width: 15rem ;
  } */
  .icon {
    font-size: 3.2rem;
  }
}
@media (max-width: 768px) {
  /* .card {
    width: 16rem ;
  } */
  .icon {
    font-size: 3rem;
  }
}
@media (max-width: 576px) {
  /* .card {
    width: 18rem;
  } */
  .icon {
    font-size: 2.8rem;
  }
}
</style>
