<script setup lang="ts">
    const newModel = defineModel<number>()
</script>
<template>
    <select v-model="newModel">
        <option value="1">LDAP</option>
        <option value="2">Локальная</option>
    </select>
</template>

<style scoped lang="css">
    @reference "tailwindcss";

    select {
        @apply w-[100%] h-[100%] p-3 focus-visible:outline-0 cursor-pointer;
    }
</style>
