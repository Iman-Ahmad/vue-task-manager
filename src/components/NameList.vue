<script setup lang="ts">
defineProps<{
    names: string[]
}>()
</script>

<template>
    <ul>
        <li v-for="person in names" :key="person">
            {{person}}
        </li>
    </ul>
</template>