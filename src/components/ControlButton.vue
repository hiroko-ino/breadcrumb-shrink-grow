<script setup lang="ts">
</script>

<template>
  <button
    class="bg-slate-700 text-white rounded-lg px-3 py-1 flex items-center gap-x-1"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<style scoped>
</style>
