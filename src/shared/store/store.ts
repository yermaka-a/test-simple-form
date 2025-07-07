import { defineStore } from 'pinia'

export interface Account {
    id: number
    mark: string | { text: string }[]
    typeOfRecord: string
    login: string
    password: string | null
    isValid: 'validate' | 'invalid' | 'valid'
}

interface AccountsStore {
    countOfIDs: number
    accounts: Account[]
}

export const useAccountsStore = defineStore('accounts', {
    state: (): AccountsStore => ({
        countOfIDs: 0,
        accounts: [],
    }),
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
