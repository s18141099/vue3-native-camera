<script setup lang="ts">
import { ref } from 'vue'

import Compressor from './Compressor'

const camera = ref<HTMLInputElement | null>()

const { quality, timeout } = withDefaults(defineProps<{
    quality: number,
    timeout?: number
}>(), {
    quality: 1,
    timeout: 300
})

const emits = defineEmits<{
    (e: "onSnapshot", v: string): void
}>()

defineExpose({
    open,
})

function open(): void {
    setTimeout(() => {
        camera.value?.click()
    }, timeout)
}

function onChange(e: Event): void {
    const inputElement = e.target as HTMLInputElement
    const files = inputElement.files
    if (!files || files.length === 0) return

    const fReader = new FileReader()
    fReader.readAsDataURL(files[0])
    fReader.onload = async (event) => {
        const result = (event.target as FileReader).result
        const compressor = new Compressor({ dataURL: String(result), quality })
        const dataURL = await compressor.compression()

        emits("onSnapshot", dataURL)
    }
}
</script>

<template>
    <input type="file" ref="camera" capture="environment" accept="image/*" hidden @change="onChange">
</template>

<style scoped></style>
