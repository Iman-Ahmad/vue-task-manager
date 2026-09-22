<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTaskStore } from '../stores/tasks'

const currentRoute = useRoute()
const taskStore = useTaskStore()

const taskId = computed (() => Number(currentRoute.params.taskId))

const currentTask = computed(() => 
taskStore.tasks.find(task => task.id === taskId.value)
)
</script>

<template>
    <main class="page">
        <h1>Task Details</h1>

        <div v-if="currentTask">
            <h2> {{currentTask.title}} </h2>

            <p>
                Completed:
                {{ currentTask.completed ? 'Yes' : 'No'}}
            </p>
        </div>

        <p v-else>
            Task not found.
        </p>

    </main>
</template>