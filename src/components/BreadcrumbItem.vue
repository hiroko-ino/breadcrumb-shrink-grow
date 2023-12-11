<script setup lang="ts">
const props = defineProps({
  isCurrent: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <li class="min-w-[6em] shrink">
    <slot />
    <button v-if="props.isCurrent">
      <i className="i-mdi-menu-down" />
    </button>
  </li>
</template>

<style scoped>
</style>
