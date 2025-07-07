const STORE_NAME = 'global_store'

import { defineStore } from 'pinia'

export interface Account {
    id: number
    mark: { text: string }[]
    typeOfRecord: string
    login: string
    password: string | null
    isValid: 'validate' | 'invalid' | 'valid'
}

interface AccountsStore {
    countOfIDs: number
    accounts: Account[]
}

const getDefaultStore = (): AccountsStore => ({
    countOfIDs: 0,
    accounts: [],
})

const getStore = (): AccountsStore => {
    const store = localStorage.getItem(STORE_NAME)

    return store ? JSON.parse(store) : getDefaultStore()
}

export const useAccountsStore = defineStore('accounts', {
    state: getStore,

    actions: {
        pushAccount(account: Account) {
            this.accounts.push(account)
        },
        updateCount() {
            this.countOfIDs = this.countOfIDs + 1
        },
        deleteById(id: number) {
            this.accounts = this.accounts.filter((acc) => acc.id !== id)
        },
        getAccById(id: number) {
            return this.accounts.find((acc) => acc.id === id)
        },
        acceptAccount(account: Account) {
            const index = this.accounts.findIndex(
                (acc) => acc.id === account.id,
            )
            if (index !== -1) {
                account.isValid = 'valid'
                const accounts = this.accounts
                accounts[index] = { ...account }
                this.accounts = accounts
                localStorage.setItem(
                    STORE_NAME,
                    JSON.stringify({
                        countOfIDs: this.countOfIDs,
                        accounts: this.accounts,
                    }),
                )
            }
        },
        updateAccount(account: Account) {
            const index = this.accounts.findIndex(
                (acc) => acc.id === account.id,
            )
            if (index !== -1) {
                const accounts = this.accounts
                accounts[index] = { ...account }
                this.accounts = accounts
            }
        },
    },
})
