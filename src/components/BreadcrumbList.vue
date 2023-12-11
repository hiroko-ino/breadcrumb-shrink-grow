<script setup lang="ts">
import { PropType } from 'vue'
import { BreadcrumbItemType } from '../types'
import BreadcrumbItem from './BreadcrumbItem.vue'

const props = defineProps({
  list: {
    type: Array as PropType<BreadcrumbItemType[]>,
    default: [],
  },
})
</script>

<template>
  <ul class="">
    <breadcrumb-item v-for="(item, index) in props.list" :key="`${index}_${item.text}_${item.id}`" :isCurrent="index === props.list.length - 1">
      {{ item.text }}
    </breadcrumb-item>
  </ul>
</template>

<style scoped>
</style>
