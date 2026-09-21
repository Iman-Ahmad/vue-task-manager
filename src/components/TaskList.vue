<script setup lang="ts">
import type {Task} from '../types'

defineProps<{
    tasks: Task[]
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
        <li v-for="task in tasks" :key="task.id">
            <input
            type = "checkbox"
            :checked="task.completed"
            @change= "emit('toggleCompleted', task.id)"
            >

            {{task.title}}
            
            <button @click="handleDeleteRequest(task)">Delete</button>

        </li>
    </ul>
</template>