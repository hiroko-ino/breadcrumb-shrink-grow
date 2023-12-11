<script setup lang="ts">
import { PropType } from 'vue'
import { BreadcrumbItemType, FileType } from '../types'

const props = defineProps({
  contentsOfCurrent: {
    type: Array as PropType<BreadcrumbItemType[]>,
    default: [],
  },
  displayFiles: {
    type: Array as PropType<FileType[]>,
    default: [],
  }
})
</script>

<template>
  <ul class="">
    <li v-for="(folder, index) in props.contentsOfCurrent" :key="`${index}_folder__${folder.text}_${folder.id}`">
      folder: {{ folder.text }}
    </li>
    <li v-for="(file, index) in props.displayFiles" :key="`${index}_file__${file}`">
      item: {{ file }}
    </li>
  </ul>
</template>

<style scoped>
</style>
