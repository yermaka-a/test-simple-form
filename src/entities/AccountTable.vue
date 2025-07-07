<script setup lang="ts">
    import { ref } from 'vue'
    import bin from '~/shared/assets/bin.png'
    import show from '~/shared/assets/show.png'
    import hide from '~/shared/assets/hide.png'

    const isShown = ref(false)

    const showPass = () => {
        isShown.value = !isShown.value
    }
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
                <tr>
                    <td><input type="text" /></td>
                    <td>
                        <select name="1" id="1">
                            <option value="1">LDAP</option>
                            <option value="2">Локальная</option>
                        </select>
                    </td>
                    <td><input type="text" required maxlength="100" /></td>
                    <td>
                        <div class="flex justify-center items-center relative">
                            <input
                                :type="isShown ? 'text' : 'password'"
                                maxlength="100" />
                            <img
                                @click="showPass"
                                class="size-8 absolute right-4 cursor-pointer"
                                :src="isShown ? show : hide"
                                alt="Скрыть или показать пароль" />
                        </div>
                    </td>
                    <td>
                        <div class="flex items-center justify-center">
                            <img
                                class="size-8"
                                :src="bin"
                                alt="Удалить запись" />
                        </div>
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
    select {
        @apply w-[100%] h-[100%] p-3 focus-visible:outline-0 cursor-pointer;
    }
</style>
