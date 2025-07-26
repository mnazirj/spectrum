<template>
  <div class="rounded border border-surface-200 dark:border-surface-700 p-6 bg-surface-0 dark:bg-surface-900">
    <div class="d-flex">
      <div class="col-lg-6 col-12">
        <Skeleton height="600px"></Skeleton>
      </div>
      <div class="col-lg-6 col-12">
        <div class="d-flex flex-column gap-2">
          <Skeleton width="4rem" height="1rem"></Skeleton>
          <Skeleton width="16rem" height="1rem"></Skeleton>
          <Skeleton height="7rem"></Skeleton>
          <Skeleton height="16rem"></Skeleton>
          <Skeleton height="10rem"></Skeleton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Skeleton from "primevue/skeleton";
</script>
