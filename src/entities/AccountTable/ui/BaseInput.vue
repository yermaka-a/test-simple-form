<script setup lang="ts">
    import { defineModel } from 'vue'

    defineProps<{
        isValid?: 'validate' | 'valid' | 'invalid'
        placeholder?: string
        maxLength?: number
        type?: string
    }>()

    const emit = defineEmits(['change'])
    const newModel = defineModel()

    const onChange = (event: Event) => {
        emit('change', event)
    }
</script>
<template>
    <input
        :class="isValid === 'invalid' ? 'shadow-sm shadow-red-400' : ''"
        @change="onChange"
        :disabled="isValid === 'valid' ? true : false"
        v-model="newModel"
        :placeholder="placeholder"
        :type="type === 'undefined' ? 'text' : type"
        :maxlength="maxLength" />
</template>

<style scoped lang="css">
    @reference "tailwindcss";

    input {
        @apply w-[100%]  h-[100%] p-3  focus:outline-0 focus-visible:outline-0;
    }
</style>
