<script setup lang="ts">
import { PropType } from 'vue'
import { BreadcrumbItemType } from '../types'
import BreadcrumbList from './BreadcrumbList.vue'

const props = defineProps({
  list: {
    type: Array as PropType<BreadcrumbItemType[]>,
    default: [],
  },
})
</script>

<template>
  <h1>Googleドライブみたいなパンくずの挙動にしたい.com</h1>
  <breadcrumb-list :list="props.list" />
</template>

<style scoped>
</style>
