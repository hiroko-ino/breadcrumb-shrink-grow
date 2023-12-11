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
    text: 'initial grandfather folder'
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
const contentsOfCurrent = computed(() => {
  let result: BreadcrumbItemType[] = []
  Object.keys(folder.value).forEach((key) => {
    if (folder.value[key].parentId === currentId.value) {
      result.push(folder.value[key])
    }
  })
  return result
})

const displayFiles = computed(() => folder.value[currentId.value].items)
</script>

<template>
  <div class="bg-red-200">
    <div class="bg-white">
      <main-header :list="breadcrumbFolder" />
      <main-contents :displayFiles="displayFiles" :contentsOfCurrent="contentsOfCurrent" />
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
