<template>
  <section :dir="$i18n.locale == 'ar' ? 'rtl' : 'ltr'">
    <router-view />
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { locale } = useI18n();

if (localStorage.getItem("locale") == null) localStorage.setItem("locale", "en");
locale.value = localStorage.getItem("locale");
</script>
