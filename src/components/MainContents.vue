<script setup lang="ts">
import { PropType } from 'vue'
import { BreadcrumbItemType, FileType } from '../types'

const emit = defineEmits(['move-folder']);

const props = defineProps({
  displayFolder: {
    type: Array as PropType<BreadcrumbItemType[]>,
    default: [],
  },
  displayFiles: {
    type: Array as PropType<FileType[]>,
    default: [],
  }
})

/**
 * フォルダ移動のemit
 */
const moveFolder = (id: string) => {
  emit('move-folder', id)
}
</script>

<template>
  <ul class="flex flex-wrap gap-4">
    <li
      v-for="(folder, index) in props.displayFolder" :key="`${index}_folder__${folder.text}_${folder.id}`"
      class="w-28 flex justify-center"
    >
      <button class="underline flex flex-col gap-x-2 items-center" @click="moveFolder(folder.id)">
        <i class="i-mdi-folder text-6xl" />
        {{ folder.text }}
      </button>
    </li>
    <li
      v-for="(file, index) in props.displayFiles" :key="`${index}_file__${file}`"
      class="flex flex-col gap-x-2 items-center w-28 flex justify-cente"
    >
      <i class="i-mdi-file text-6xl" />
      {{ file }}
    </li>
  </ul>
</template>

<style scoped>
</style>
