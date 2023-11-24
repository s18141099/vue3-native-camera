<script setup lang="ts">
import { ref } from 'vue'

const camera = ref<HTMLInputElement | null>()

const { timeout } = withDefaults(defineProps<{
    timeout: number
}>(), {
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
    fReader.onload = (event) => {
        const result = (event.target as FileReader).result
        emits("onSnapshot", String(result))
    }
}
</script>

<template>
    <input type="file" ref="camera" capture="environment" accept="image/*" hidden @change="onChange">
</template>

<style scoped></style>
