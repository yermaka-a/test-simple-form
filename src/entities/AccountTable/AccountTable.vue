<script setup lang="ts">
    import BaseInput from './ui/BaseInput.vue'
    import DeleteBtn from './ui/DeleteBtn.vue'
    import BaseSelect from './ui/BaseSelect.vue'
    import { useAccountsStore, type Account } from '~/shared'
    import MarkInput from './ui/MarkInput.vue'

    const store = useAccountsStore()

    const onOut = (acc: Account) => {
        if (acc.typeOfRecord === '1') {
            acc.password = null
        } else {
            if (acc.password?.length) {
                if (!(acc.password.length > 0 && acc.password?.length <= 100)) {
                    acc.isValid = 'invalid'
                    return
                }
            } else {
                acc.isValid = 'invalid'
                return
            }
        }
        if (acc.login.length > 0 && acc.login.length <= 100) {
            // валидация метки
            console.log('mark', acc.mark)
            if (
                typeof acc.mark === 'string' &&
                acc.mark.includes(';', 0) &&
                acc.mark.length <= 50
            ) {
                const lastIndex = acc.mark.lastIndexOf(';')
                const sub = acc.mark.slice(0, lastIndex)
                const parts = sub.split(';')
                acc.mark = parts.map((el) => ({
                    text: el,
                }))
            }
        } else {
            acc.isValid = 'invalid'
            return
        }
        store.acceptAccount(acc)
    }

    const updateModelVal = (payload: Array<{ text: string }>, acc: Account) => {
        console.log(payload, acc)
        if (payload !== null) {
            if (acc?.mark !== undefined) {
                acc.mark = payload
                console.log('updateModelVal', acc.mark)
                store.updateAccount(acc)
            }
        }
    }
    const deleteFieldById = (accountId: number) => {
        store.deleteById(accountId)
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
                <tr
                    @focusout="onOut(acc)"
                    @change="onOut(acc)"
                    v-for="acc of store.accounts"
                    :key="acc.id">
                    <td>
                        <MarkInput
                            :model-value="acc.mark"
                            @update-model-value="(payload: Array<{text: string}>)=>updateModelVal(payload, acc)"
                            type="text"
                            placeholder="Ваша метка..."
                            :max-length="50"
                            :disabled="
                                acc.isValid === 'valid' ? true : false
                            " />
                    </td>
                    <td>
                        <BaseSelect
                            v-model="acc.typeOfRecord"
                            :disabled="
                                acc.isValid === 'valid' ? true : false
                            " />
                    </td>
                    <td :colspan="acc.typeOfRecord !== '1' ? '1' : '2'">
                        <BaseInput
                            :isValid="acc.isValid"
                            v-model="acc.login"
                            type="text"
                            required
                            :max-length="100"
                            placeholder="Введите логин..." />
                    </td>
                    <td v-if="acc.typeOfRecord === '2'">
                        <BaseInput
                            :isValid="acc.isValid"
                            v-model="acc.password"
                            type="password"
                            required
                            :max-length="100"
                            placeholder="Введите пароль..." />
                    </td>
                    <td>
                        <DeleteBtn
                            :accountId="acc.id"
                            @click="deleteFieldById" />
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
