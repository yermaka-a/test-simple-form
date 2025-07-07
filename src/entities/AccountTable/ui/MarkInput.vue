<script setup lang="ts">
    import { computed } from 'vue'

    const props = defineProps<{
        isValid?: 'valid' | 'invalid' | 'validate'
        placeholder?: string
        maxLength?: number
        type?: string
        modelValue: string | { text: string }[]
    }>()
    const emit = defineEmits(['update-modelValue'])

    const onChange = (event: Event) => {
        let result = null
        let val = (event.target as HTMLInputElement).value
        if (
            typeof val === 'string' &&
            val.includes(';', 0) &&
            val.length <= 50
        ) {
            const lastIndex = val.lastIndexOf(';')
            const sub = val.slice(0, lastIndex)
            const parts = sub.split(';')
            result = parts
                .map((el) => ({
                    text: el,
                }))
                .filter((el) => el.text !== '')
        }
        emit('update-modelValue', result)
    }

    const mVal = computed(() => {
        console.log(props.modelValue)
        if (typeof props.modelValue === 'string') return props.modelValue
        return props.modelValue.map((el) => el.text).join('; ')
    })
</script>
<template>
    <input
        :value="mVal"
        @change="onChange"
        :disabled="isValid === 'valid' ? true : false"
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
