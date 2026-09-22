<script setup lang="ts">
import type {Task} from '../types'
import { useRouter } from 'vue-router'

const router = useRouter()

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

function handleTaskDetails(task: Task) {
  router.push(`/tasks/${task.id}`)
}
</script>

<template>
    <ul class="task-list">
        <li v-for="task in tasks" :key="task.id" :class="{completed: task.completed}">
            <div class="task-content">
                <input
                type = "checkbox"
                :checked="task.completed"
                @change= "emit('toggleCompleted', task.id)"
                >

                {{task.title}}
            </div>

            <button @click="handleDeleteTaskRequest(task)">Delete</button>

            <button @click="handleTaskDetails(task)">
              Details
            </button>

        </li>
    </ul>
</template>

<style scoped>
.task-list {
  list-style: none;
  padding: 0;
  margin: 0 0 32px;
}

.task-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--color-border);
}

.task-content {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
}

.task-content span {
  overflow-wrap: anywhere;
}

.completed {
  text-decoration: line-through;
  opacity: 0.6;
}

.task-list button {
  flex-shrink: 0;
}
</style>