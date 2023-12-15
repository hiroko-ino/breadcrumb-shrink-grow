<script setup lang="ts">
import { PropType } from 'vue'
import { BreadcrumbItemType } from '../types'
import BreadcrumbList from './BreadcrumbList.vue'
import Control from './Control.vue';

const emit = defineEmits(['move-folder', 'create-folder', 'create-file']);

const props = defineProps({
  list: {
    type: Array as PropType<BreadcrumbItemType[]>,
    default: [],
  },
  currentId: {
    type: String,
    required: true, 
  },
  initialGrandfatherId: {
    type: String,
    required: true, 
  }
})

/**
 * フォルダ移動のemit
 */
 const moveFolder = (id: string) => {
  emit('move-folder', id)
}

/**
 * フォルダ作成のemit
 */
 const createFolder = (parentId: string, folderName: string) => {
  emit('create-folder', parentId, folderName)
}

/**
 * フォルダ作成のemit
 */
 const createFile = (parentId: string, fileName: string) => {
  emit('create-file', parentId, fileName)
}

/**
 * ファイル
 */
</script>

<template>
  <p>PCでみてね！</p>
  <h1 class="text-2xl font-bold mt-1">📁 Vue.jsでDOM操作の鬼になり、パンくずの伸縮表示を極めたい.com</h1>
  <div class="mt-2 flex justify-between items-center max-w-full">
    <breadcrumb-list
      class="shrink grow"
      :list="props.list"
      :initialGrandfatherId="initialGrandfatherId"
      @move-folder="moveFolder"
      @create-folder="createFolder" />
    <control :currentId="currentId" @create-folder="createFolder" @create-file="createFile" class="shrink-0" />
  </div>
</template>

<style scoped>
</style>
