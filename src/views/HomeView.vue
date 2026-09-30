<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue'
  import { useTaskStore } from '../stores/tasks'
  import type { Task, TaskFilter } from '../types'
  import TaskForm from '../components/TaskForm.vue'
  import TaskList from '../components/TaskList.vue'
  import TaskFilters from '../components/TaskFilters.vue'

  const taskStore = useTaskStore()
  onMounted(() => {
    taskStore.loadApiTasks()
  })

  const taskTitle = ref('')
  const taskError = ref('')

  function handleAddTask(title: string) {
    const error = taskStore.addTask(title)

    if (error) {
      taskError.value = error
      return
    }

    taskError.value = ''
    taskTitle.value = ''
  }

  const selectedFilter = ref<TaskFilter>('all')

  const totalTasks = computed(() =>
    taskStore.tasks.length
  )

  const completedTasks = computed(() =>
    taskStore.tasks.filter(task => task.completed).length
  )

  const activeTasks = computed(() =>
    taskStore.tasks.filter(task => !task.completed).length
  )

  const filteredTasks = computed(() => {
    if (selectedFilter.value === 'active') {
      return taskStore.tasks.filter(task => !task.completed)
    }

    if (selectedFilter.value === 'completed') {
      return taskStore.tasks.filter(task => task.completed)
    }

    return taskStore.tasks
  })

  function handleFilterChange(filter: TaskFilter): void {
    selectedFilter.value = filter
  }

  const emptyMessage = computed(() => {
    if (selectedFilter.value === 'active'){
      return 'No active tasks.'
    }

    if (selectedFilter.value === 'completed'){
      return 'No completed tasks.'
    }

    return 'No tasks yet.'
  })
</script>

<template>
  <main class="page">
    <h1>Ready to complete your tasks?!</h1>

    <section class="api-status">
      <h2>API Demo</h2>

      <p v-if="taskStore.isApiLoading">
        Loading tasks from API...
      </p>

      <p v-else-if="taskStore.apiError" class="api-error">
        {{ taskStore.apiError }}
      </p>

      <p v-else>
        Loaded {{ taskStore.apiTasks.length }} tasks from the API.
      </p>
    </section>

    <div class="task-form">
      <TaskForm
        v-model:title="taskTitle"
        @addTask="handleAddTask"
      />
    </div>

    <p v-if="taskError" class="task-error">
      {{ taskError }}
    </p>

    <TaskFilters
      :selected-filter="selectedFilter"
      @update-filter="handleFilterChange"
    />

    <div class="task-counts">
      <div>Total: {{ totalTasks }}</div>
      <div>Active: {{ activeTasks }}</div>
      <div>Completed: {{ completedTasks }}</div>
    </div>

    <div v-if="filteredTasks.length > 0">
      <TaskList
        :tasks="filteredTasks"
        @deleteTask="taskStore.deleteTask"
        @toggleCompleted="taskStore.toggleTaskCompleted"
        @updateTask="taskStore.updateTask"
      />
    </div>

    <p v-else class="empty-message">
      {{ emptyMessage }}
    </p>
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

  h1 {
    margin-bottom: 24px;
  }
  .api-status {
    margin-bottom: 24px;
    padding: 16px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
  }

  .api-status h2 {
    margin: 0 0 8px;
    font-size: 18px;
  }

  .api-status p {
    margin: 0;
  }

  .api-error {
    color: #c0392b;
  }

  .task-form {
    margin-bottom: 24px;
  }

  .task-counts {
    display: flex;
    gap: 24px;
    margin-bottom: 24px;
    padding: 12px 0;
    border-top: 1px solid var(--color-border);
    border-bottom: 1px solid var(--color-border);
  }

  .task-counts div {
  flex: 1;
  text-align: center;
  font-weight: 600;
}

.empty-message {
  margin: 32px 0;
  text-align: center;
  opacity: 0.7;
}
</style>
