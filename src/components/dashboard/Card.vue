<template>
  <div class="card rounded-3 shadow-3 my-2">
    <div
      class="d-flex justify-content-center align-items-center flex-wrap rounded-3 h-100 p-2 bg-main text-white"
    >
      <div class="w-100 d-flex justify-content-center">
        <div class="w-50 d-flex justify-content-center align-items-center">
          <i :class="[props.icon.value, 'icon']" :style="{ fontSize: props.icon.size }" />
        </div>

        <div
          class="w-50 d-flex flex-wrap justify-content-center align-items-center"
        >
          <div class="w-100 d-flex justify-content-center my-1">
            <span
              :class="[
                'text-center',
                props.value.textWrap ? 'text-wrap' : 'text-nowrap',
              ]"
              :style="{
                fontWeight: props.value.bold ? 'bold' : 'normal',
                fontSize: props.value.fontSize || '1rem',
              }"
              >{{
                props.value.withComma
                  ? Intl.NumberFormat("en-US").format(props.value.value)
                  : props.value.value
              }}{{ props.value.symbol }}</span
            >
          </div>
          <div class="w-100 d-flex justify-content-center my-1">
            <span
              :class="[
                'text-center',
                props.label.textWrap ? 'text-wrap' : 'text-nowrap',
              ]"
              :style="{
                fontWeight: props.label.bold ? 'bold' : 'normal',
                fontSize: props.label.fontSize || '1rem',
              }"
              >{{ props.label.value }}</span
            >
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
    Type: Object,
    required: true,
    default: {
      value: 0,
      fontSize: "1rem",
      textWrap: true,
      bold: true,
      withComma: false,
      symbol:'',
    },
  },
  icon: {
    Type: Object,
    required: true,
    default: {
      value:'pi pi-user',
      size:'1rem',
    },
  },
  label: {
    Type: Object,
    required: true,
    default: {
      value: "Default",
      fontSize: "1rem",
      textWrap: true,
      bold: true,
    },
  },
});
</script>

<style scoped>
.card {
  transition: all 0.2s ease;
  transform-origin: center;
}
/* .card-4 {
  width: 14rem;
  height: 10rem;
}
.card-3{
 width: rem;
  height: 10rem;
} */
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
