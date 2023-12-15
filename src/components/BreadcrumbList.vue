<script setup lang="ts">
import { PropType, ref, computed, watch, onMounted, nextTick } from 'vue'
import { useEventListener } from '@vueuse/core'
import { BreadcrumbItemType } from '../types'

const emit = defineEmits(['move-folder', 'create-folder']);

const props = defineProps({
  list: {
    type: Array as PropType<BreadcrumbItemType[]>,
    default: [],
  },
  initialGrandfatherId: {
    type: String,
    required: true, 
  },
})

/**
 * 親要素のref
 */
const parentRef = ref<HTMLDivElement | null>(null)

/**
 * リストの子要素のref（配列）
 */
const itemRefs = ref<HTMLLIElement[] | null>(null)

/**
 * 親要素の横幅
 */
const parentWidth = ref(0)

/**
 * 子要素の初期横幅（配列）
 */
const itemsInitialWidth = ref<number[]>([])

/**
 * 要素を表示するかどうかの配列
 */
const showArray = ref<boolean[]>(new Array<boolean>(props.list.length).fill(true))

/**
 * 表示アイテムの横幅のみ配列
 */
const widthArrayOnlyDisplayItem = ref<number[]>([])

/**
 * 何番目から表示しているか
 */
 const showIndex = computed(() => showArray.value.findIndex(bool => bool))

/**
 * 三点リーダーを表示するかどうか
 */
const showHoriz = computed(() => showArray.value.some((boolean) => !boolean))

/**
 * 三点リーダーのメニューを表示するかどうか
 */
const showHorizMenu = ref(false)

/**
 * 三点リーダーのメニューを表示するかどうかをトグルする
 */
const toggleHorizMenu = () => {
  showHorizMenu.value = !showHorizMenu.value
}

/**
 * カレントメニューを表示するかどうか
 */
const showCurrentMenu = ref(false)

/**
 * カレントメニューを表示するかどうかをトグルする
 */
const toggleShowCurrentMenu = () => {
  showCurrentMenu.value = !showCurrentMenu.value
}

/**
 * アイコン類の横幅
 */
const homeAndHorizWidth = computed(() => showHoriz.value ? iconWidth * 2 : iconWidth)

/**
 * アイコンのサイズ
 */
const iconWidth = 44

/**
 * gapの値
 */
const gap = 8

/**
 * showArrayOnlyDisplayItemの合計値
 */
const sumOfShowArrayOnlyDisplayItem = computed(() => {
  return widthArrayOnlyDisplayItem.value.reduce((a, b) => {
    return a + b;
  }, 0);
})

/**
 * 親要素のclientWidthを更新する
 */
const updateParentWidth = () => {
  const _parentWidth = parentRef.value?.clientWidth
  if (_parentWidth) {
    parentWidth.value = _parentWidth
  }
}
// resize時に親要素のclientWidthを更新する
useEventListener('resize', updateParentWidth)

/**
 * 子要素の初期clientWidthを更新する
 */
const updateItemsInitialWidth = () => {
  const _itemsWidth = itemRefs.value?.map((item) => {
    return item.clientWidth
  })
  if (_itemsWidth) {
    itemsInitialWidth.value = _itemsWidth
  }
}

/**
 * widthArrayOnlyDisplayItemのアップデート
 */
const updateWidthArrayOnlyDisplayItem = () => {
  const _widthArrayOnlyDisplayItem: number[] = []
  let showItemCount = 0
  showArray.value.forEach((bool) => {
    if (bool && itemRefs.value) {
      _widthArrayOnlyDisplayItem.push(itemRefs.value[showItemCount].clientWidth)
      showItemCount++
    }
  })
  widthArrayOnlyDisplayItem.value = _widthArrayOnlyDisplayItem
}

/**
 * フォルダ移動のemit
 */
const moveFolder = (id: string) => {
  emit('move-folder', id)
}

/**
 * watch時とアイテム増減時に実行する関数
 */
const checkForAdjust = () => {
  // shrinkによる各サイズの変更をアップデートする
  updateWidthArrayOnlyDisplayItem()

  // 親要素の幅と内容物の差分
  const diff = parentWidth.value - sumOfShowArrayOnlyDisplayItem.value - homeAndHorizWidth.value - gap * widthArrayOnlyDisplayItem.value.length

  if (diff <= 0) {
    const minWidth = Math.min.apply(null, widthArrayOnlyDisplayItem.value)
    // 各アイテムの横幅が最小値に至っている場合
    if (minWidth === 144) {
      let total = 0;
      // 逆順から判定する
      [...widthArrayOnlyDisplayItem.value].reverse().forEach((width, index) => {
        total += width + gap
        showArray.value[showArray.value.length - 1 - index] = total < parentWidth.value - homeAndHorizWidth.value - gap * widthArrayOnlyDisplayItem.value.length
      })
    }
  } else {
    // すべてのアイテムを表示していない場合
    if (showIndex.value <= props.list.length -1) {
      // 次回表示したい横幅
      const nextSum = sumOfShowArrayOnlyDisplayItem.value + gap * (widthArrayOnlyDisplayItem.value.length + 1) + homeAndHorizWidth.value + (itemsInitialWidth.value[showIndex.value + 1] <= 144 ? itemsInitialWidth.value[showIndex.value + 1] : 144)
      if (parentWidth.value >= nextSum) {
        if (showIndex.value !== -1) {
          showArray.value[showIndex.value - 1] = true
        } else {
          showArray.value[showArray.value.length - 1] = true
        }
      }
    }
  }
}

watch(parentWidth, () => {
  checkForAdjust()
})

watch(() => props.list, () => {
  showArray.value = new Array<boolean>(props.list.length).fill(true)
  nextTick(() => {
    checkForAdjust()
    // nextTick mounted value
  })
})

onMounted(() => {
  if (parentRef && itemRefs) {
      updateItemsInitialWidth()
      updateParentWidth()
    }
})

</script>

<template>
  <ul class="flex gap-x-2 max-w-breadcrumb" ref="parentRef">
    <li class="list-none flex items-center gap-x-1 shrink-0">
      <button @click="moveFolder(initialGrandfatherId)">
        <i className="i-mdi-home text-2xl" />
      </button>
      <span v-if="props.list.length > 0">
        <i className="i-mdi-chevron-right" />
      </span>
    </li>
    <li v-if="showHoriz" class="list-none flex items-center gap-x-1 shrink-0 relative">
      <button @click="toggleHorizMenu">
        <i className="i-mdi-dots-horizontal text-2xl" />
      </button>
      <ul v-if="showHorizMenu" class="absolute top-10 left-0 bg-white w-[160px] rounded-lg text-sm px-3 py-2 border flex flex-col gap-y-2">
        <template v-for="(item, index) in props.list">
          <li
            v-if="!showArray[index]"
            class="overflow-hidden text-ellipsis whitespace-nowrap max-w-full"
          >{{ item.text }}</li>
        </template>
      </ul>
      <span v-if="props.list.length > 0">
        <i className="i-mdi-chevron-right" />
      </span>
    </li>
    <template
      v-for="(item, index) in props.list"
      :key="`${index}_${item.text}_${item.id}`"
    >
      <li
        v-if="showArray[index]"
        ref="itemRefs"
        class="list-none shrink overflow-hidden min-w-[9em] flex items-center"
      >
        <template v-if="index !== props.list.length - 1">
          <button class="underline flex items-center items-center gap-x-1  max-w-full overflow-hidden" @click="moveFolder(item.id)">
            <span class="overflow-hidden text-ellipsis whitespace-nowrap max-w-[10em] w-full">{{ item.text }}</span>
          </button>
          <span>
              <i className="i-mdi-chevron-right" />
          </span>
        </template>
        <div v-else class="flex items-center items-center gap-x-1  max-w-full overflow-hidden relative">
          <span class="overflow-hidden text-ellipsis whitespace-nowrap max-w-[10em] w-full">{{ item.text }}</span>
          <button @click="toggleShowCurrentMenu">
            <i className="i-mdi-menu-down" />
          </button>
        </div>
      </li>
    </template>
  </ul>
</template>

<style scoped>
</style>
