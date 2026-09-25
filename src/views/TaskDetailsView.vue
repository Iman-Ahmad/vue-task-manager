<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTaskStore } from '../stores/tasks'

const currentRoute = useRoute()
const router = useRouter()
const taskStore = useTaskStore()

const taskId = computed (() => Number(currentRoute.params.taskId))

const currentTask = computed(() => 
taskStore.tasks.find(task => task.id === taskId.value)
)

function handleToggleTask() {
    if (!currentTask.value) {
        return
    }

    taskStore.toggleTaskCompleted(currentTask.value.id)
}

function handleBackToTasks() {
    router.push('/')
}
</script>

<template>
    <main class="page">
        <button @click="handleBackToTasks">
            ← Back to tasks
        </button>

        <div v-if="currentTask" class="task-details">
            <h1>Task Details</h1>

            <h2>{{ currentTask.title }}</h2>

            <p>
                Status:
                <strong>
                    {{ currentTask.completed ? 'Completed' : 'Active' }}
                </strong>
            </p>

            <button @click="handleToggleTask">
                {{
                    currentTask.completed
                    ? 'Mark as active'
                    : 'Mark as completed'
                }}
            </button>
        </div>

        <div v-else class="task-not-found">
            <h1>Task not found</h1>

            <p>
                This task does not exist or may have been removed.
            </p>
        </div>
    </main>
</template>

<style scoped>
    .page {
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 24px;
    box-sizing: border-box;
    }

    .task-details {
    margin-top: 32px;
    }

    .task-details h1 {
    margin-bottom: 24px;
    }

    .task-details h2 {
    margin-bottom: 16px;
    }

    .task-details p {
    margin-bottom: 24px;
    }

    .task-not-found {
    margin-top: 32px;
    }
</style>