<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useTaskStore } from '../stores/tasks'
  import type { Task, TaskFilter } from '../types'
  import { fetchTask } from '../services/taskApi'
  import TaskForm from '../components/TaskForm.vue'
  import TaskList from '../components/TaskList.vue'
  import TaskFilters from '../components/TaskFilters.vue'

  const taskStore = useTaskStore()

  const taskTitle = ref('')
  const taskError = ref('')

  const isLoading = ref(false)
  const apiError = ref('')
  const apiTask = ref<Task | null>(null)

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

  async function testApiRequest(): Promise<void> {
    isLoading.value = true
    apiError.value = ''
    apiTask.value = null

    try {
      const task = await fetchTask()

      apiTask.value = task
    }
    catch (error) {
      apiError.value = 'Failed to load task.'
      console.error('API request failed:', error)
    }
    finally {
      isLoading.value = false
    }
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

    <button @click="testApiRequest">
      Test API
    </button>

    <p v-if="isLoading">
      Loading...
    </p>

    <p v-if="apiError">
      {{ apiError }}
    </p>

    <div v-if="apiTask">
      <p>ID: {{ apiTask.id }} </p>
      <p>Title: {{ apiTask.title }} </p>
      <p>
        Completed:
        {{ apiTask.completed ? 'Yes' : 'No' }}
      </p>
    </div>

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
