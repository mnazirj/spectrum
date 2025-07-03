<template>
  <router-view :dir="isEng ? 'ltr' : 'rtl'" />
</template>

<script setup>
import { ref, onBeforeMount} from "vue";

// Hooks
onBeforeMount(() => {
  if (localStorage.getItem("locale") === "en") {
    isEng.value = true;
  }
});
// Data
const isEng = ref(false);
</script>
<script>
export default {
  mounted() {
    this.$i18n.locale = localStorage.getItem("locale");
  },
};
</script>

