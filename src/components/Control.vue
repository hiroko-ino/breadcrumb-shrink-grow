<script setup lang="ts">
import ControlButton from './ControlButton.vue';

const emit = defineEmits(['create-folder', 'create-file']);

const props = defineProps({
  currentId: {
    type: String,
    required: true, 
  }
})


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
</script>

<template>
  <ul class="flex gap-x-4">
    <li>
      <control-button @click="createFolder(props.currentId, '新しいフォルダ')">
        フォルダ新規作成
        <i class="i-mdi-plus" />
      </control-button>
    </li>
    <li>
      <control-button @click="createFile(props.currentId, '新しいファイル')">
        ファイル新規作成
        <i class="i-mdi-plus" />
      </control-button>
    </li>
  </ul>
</template>

<style scoped>
</style>
