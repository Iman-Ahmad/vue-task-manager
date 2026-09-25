<script setup lang="ts">
import { ref } from 'vue'
import type {Task} from '../types'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{
    tasks: Task[]
}>()

const emit = defineEmits<{
    deleteTask: [id: number]
    toggleCompleted: [id: number]
    updateTask: [id: number, title: string]
}>()

const editingTaskId = ref<number | null>(null)
const editingTitle = ref('')

function handleDeleteTaskRequest(task: Task) {
    emit('deleteTask', task.id)
}

function handleTaskDetails(task: Task) {
  router.push(`/tasks/${task.id}`)
}

function handleEditTask(task: Task) {
  editingTaskId.value = task.id
  editingTitle.value = task.title
}

function handleSaveTask (task: Task) {
  emit ('updateTask', task.id, editingTitle.value)

  editingTaskId.value = null
  editingTitle.value = ''
}

function handleCancelEdit () {
  editingTaskId.value = null
  editingTitle.value = ''
}
</script>

<template>
    <ul class="task-list">
        <li
          v-for="task in tasks"
          :key="task.id"
          :class="{completed: task.completed}"
          >
            <template v-if="editingTaskId === task.id">
              <input
                v-model ="editingTitle"
                class="editInput"
              />

              <button @click="handleSaveTask(task)">
                Save
              </button>

              <button @click="handleCancelEdit">
                Cancel
              </button>
            </template>

            <template v-else>
              <div class="task-content">
                <input
                type = "checkbox"
                :checked="task.completed"
                @change= "emit('toggleCompleted', task.id)"
                >

                {{task.title}}
              </div>

              <button @click="handleEditTask(task)">
                Edit
              </button>

              <button @click="handleDeleteTaskRequest(task)">
                Delete
              </button>

              <button @click="handleTaskDetails(task)">
                Details
              </button>
            </template>

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