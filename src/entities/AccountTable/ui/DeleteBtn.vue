<script setup lang="ts">
    import { useAccountsStore } from '~/shared'
    import bin from '~/shared/assets/bin.png'
    const props = defineProps<{ accountId?: number }>()
    const accountStore = useAccountsStore()
    const onClick = () => {
        console.group('delete')
        console.log(props.accountId)
        if (props.accountId) accountStore.deleteById(props.accountId)
        console.log(accountStore.accounts)
        console.groupEnd()
    }
</script>
<template>
    <div class="flex items-center justify-center">
        <img
            @click="onClick"
            class="size-8 cursor-pointer"
            :src="bin"
            alt="Удалить запись"
            draggable="false" />
    </div>
</template>

<style scoped lang="css">
    @reference "tailwindcss";

    select {
        @apply w-[100%] h-[100%] p-3 focus-visible:outline-0 cursor-pointer;
    }
</style>
