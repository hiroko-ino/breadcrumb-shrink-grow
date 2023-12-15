<script setup lang="ts">
import { ref, computed } from 'vue';
import { BreadcrumbType, BreadcrumbItemType } from './types';
import { v4 as uuidv4 } from 'uuid';
import MainHeader from './components/MainHeader.vue';
import MainContents from './components/MainContents.vue';

/**
 * 初期祖先フォルダ
 */
const initialGrandfatherId = uuidv4()
/**
 * 初期親フォルダ
 */
const initialParentId = uuidv4()
/**
 * 初期姉妹フォルダ
 */
const initialSisterId = uuidv4()
/**
 * 初期フォルダ
 */
const initialCurrentId = uuidv4()
/**
 * 初期子供フォルダ
 */
const initialChildId = uuidv4()

/**
 * フォルダの状態
 */
const folder = ref<BreadcrumbType>({
  [initialGrandfatherId]: {
    id: initialGrandfatherId,
    text: 'initial grandfather folder',
    items: []
  },
  [initialParentId]: {
    id: initialParentId,
    text: 'initial parent folder',
    items: [
      '金融資産',
    ],
    parentId: initialGrandfatherId,
  },
  [initialCurrentId]: {
    id: initialCurrentId,
    text: 'initial current folder',
    items: [
      'シエンタ',
    ],
    parentId: initialParentId,
  },
  [initialSisterId]: {
    id: initialSisterId,
    text: 'initial sister folder',
    items: [
      'レクサス'
    ],
    parentId: initialParentId,
  },
  [initialChildId]: {
    id: initialChildId,
    text: 'initial child folder',
    items: [
      'ジュニアNISA',
    ],
    parentId: initialCurrentId,
  }
})

/**
 * 現在表示しているフォルダのid
 */
const currentId = ref(initialCurrentId)

/**
 * パンくずに表示するフォルダ
 */
const breadcrumbFolder = computed(() => {
  const result = []
  let id: string | null = currentId.value
  while(id) {
    const current: BreadcrumbItemType = folder.value[id]
    result.push(current)
    id = current.parentId ? current.parentId : null
  }
  return [...result].reverse()
})

/**
 * コンテンツ部分に表示する現在のフォルダの内容
 */
const displayFolder = computed(() => {
  let result: BreadcrumbItemType[] = []
  Object.keys(folder.value).forEach((key) => {
    if (folder.value[key].parentId === currentId.value) {
      result.push(folder.value[key])
    }
  })
  return result
})

/**
 * 表示するファイル
 */
const displayFiles = computed(() => folder.value[currentId.value].items)

/**
 * フォルダに移動する
 */
const moveFolder = (id: string) => {
  currentId.value = id
}

/**
 * フォルダを作成する
 */
const createFolder = (parentId: string, folderName: string) => {
  const clone = {
    ...folder.value
  }

  const id = uuidv4()
  clone[id] = {
    id,
    text: folderName,
    items: [],
    parentId,
  }
  folder.value = clone
}

/**
 * ファイルを作成する
 */
const createFile = (parentId: string, fileName: string) => {
  const clone = {
    ...folder.value
  }

  clone[parentId].items.push(fileName)

  folder.value = clone
}
</script>

<template>
  <div class="pa-5">
    <div class="bg-white rounded py-3 px-4">
      <main-header
        :list="breadcrumbFolder"
        :currentId="currentId"
        :initialGrandfatherId="initialGrandfatherId"
        @move-folder="moveFolder"
        @create-folder="createFolder"
        @create-file="createFile"
      />
    </div>
    <div class="bg-white mt-5 rounded py-3 px-4">
      <main-contents
        :displayFiles="displayFiles"
        :displayFolder="displayFolder"
        @move-folder="moveFolder"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
