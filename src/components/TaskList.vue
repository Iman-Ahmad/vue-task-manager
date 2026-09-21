<script setup lang="ts">
import type {Task} from '../types'

defineProps<{
    tasks: Task[]
}>()

const emit = defineEmits<{
    deleteTask: [id: number]
    toggleCompleted: [id: number]
}>()

function handleDeleteTaskRequest(task: Task) {
    emit('deleteTask', task.id)
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
            
            <button @click="handleDeleteTaskRequest(task)">Delete</button>

        </li>
    </ul>
</template>