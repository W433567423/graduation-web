<template>
    <div ref="editorRef" class="h-100%"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
const editorRef = ref()
onMounted(() => {
  console.log(1)
})
</script>

<style lang="less" scoped>
</style>
