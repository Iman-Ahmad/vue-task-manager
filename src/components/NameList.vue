<script setup lang="ts">
import type {person} from '../types'

defineProps<{
    names: Person[]
}>()

const emit = defineEmits<{
    deleteName: [id: number]
}>()

function handleDeleteRequest(person: Person) {
    emit('deleteName', person.id)
}

</script>

<template>
    <ul>
        <li v-for="person in names" :key="person.id">
            {{person.name}}
            <button @click="handleDeleteRequest(person)">Delete</button>
        </li>
    </ul>
</template>