<script setup lang="ts">
    import BaseInput from './ui/BaseInput.vue'
    import DeleteBtn from './ui/DeleteBtn.vue'
    import BaseSelect from './ui/BaseSelect.vue'
    import { useAccountsStore } from '~/shared'

    const store = useAccountsStore()
</script>
<template>
    <main class="flex items-center justify-center">
        <table class="w-[98%]">
            <thead>
                <tr>
                    <th>Метки</th>
                    <th>Тип записи</th>
                    <th>Логин</th>
                    <th>Пароль</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="acc of store.accounts" :key="acc.id">
                    <td>
                        <BaseInput
                            v-model="acc.mark"
                            type="text"
                            placeholder="Ваша метка..."
                            :max-length="50" />
                    </td>
                    <td>
                        <BaseSelect v-model="acc.typeOfRecord" />
                    </td>
                    <td>
                        <BaseInput
                            v-model="acc.login"
                            type="text"
                            required
                            :max-length="100"
                            placeholder="Введите логин..." />
                    </td>
                    <td>
                        <BaseInput
                            v-model="acc.password"
                            type="password"
                            required
                            :max-length="100"
                            placeholder="Введите пароль..." />
                    </td>
                    <td>
                        <DeleteBtn :accountId="acc.id" />
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<style scoped lang="css">
    @reference "tailwindcss";
    thead th {
        @apply text-start text-xl text-gray-500 pl-1;
    }
    tbody tr {
        @apply [:first-child]:border-t-1 border-gray-400 text-xl;
    }
    td {
        @apply mb-0 border-b-1 border-r-1 border-l-1 border-gray-400;
    }
    input {
        @apply w-[100%]  h-[100%] p-3  focus:outline-0 focus-visible:outline-0;
    }
</style>
