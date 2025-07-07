<script setup lang="ts">
    import { BaseBtn, useAccountsStore } from '~/shared'
    const accountStore = useAccountsStore()
    const addAccount = () => {
        accountStore.updateCount()
        const count = accountStore.countOfIDs
        accountStore.pushAccount({
            id: count,
            login: '',
            mark: '',
            password: '',
            typeOfRecord: '1',
            isValid: 'validate',
        })
    }
</script>

<template>
    <header class="bg-red-500 flex justify-center shadow-md shadow-red-400">
        <div class="w-10/12 flex justify-start items-center p-[1rem]">
            <h1 class="font-bold mr-3.5 text-4xl text-gray-200">
                Учетные записи
            </h1>
            <BaseBtn @click="addAccount" />
        </div>
    </header>
</template>

<style scoped></style>
