<script setup lang="ts">
import type {Task} from '../types'

defineProps<{
    names: Task[]
}>()

const emit = defineEmits<{
    deleteName: [id: number]
    toggleCompleted: [id: number]
}>()

function handleDeleteRequest(task: Task) {
    emit('deleteName', task.id)
}

</script>

<template>
    <ul>
        <li v-for="person in names" :key="person.id">
            <input
            type = "checkbox"
            :checked="person.completed"
            @change= "emit('toggleCompleted', person.id)"
            >

            {{person.title}}
            
            <button @click="handleDeleteRequest(person)">Delete</button>

        </li>
    </ul>
</template>