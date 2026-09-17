<script setup lang="ts">
import {ref} from 'vue'

const emit = defineEmits<{
    addName: [name:string]
}>()

function handleAddNameRequest() {
    emit('addName', name.value)
}
const name = ref('')
</script>

<template>
    <input v-model="name" placeholder="Write your name"/>
    <button @click="handleAddNameRequest">Add your name</button>
</template>