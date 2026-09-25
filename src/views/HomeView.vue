<script setup lang="ts">
  import { computed, ref } from 'vue'
  import TaskForm from '../components/TaskForm.vue'
  import TaskList from '../components/TaskList.vue'
  import { useTaskStore } from '../stores/tasks'

  const taskStore = useTaskStore()

  const taskTitle = ref('')

  const selectedFilter = ref<'all' | 'active' | 'completed'>('all')

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
</script>

<template>
  <main class="page">
    <h1>Ready to complete your tasks?!</h1>

    <div class="task-form">
      <TaskForm
        v-model:title="taskTitle"
        @addTask="taskStore.addTask"
      />
    </div>

    <div class="filters">
      <button @click="selectedFilter = 'all'">
        All
      </button>

      <button @click="selectedFilter = 'active'">
        Active
      </button>

      <button @click="selectedFilter = 'completed'">
        Completed
      </button>

      <button @click="taskStore.clearCompletedTasks">
        Clear completed tasks
      </button>
    </div>

    <div class="task-counts">
      <div>Total: {{ totalTasks }}</div>
      <div>Active: {{ activeTasks }}</div>
      <div>Completed: {{ completedTasks }}</div>
    </div>

    <TaskList
      :tasks="filteredTasks"
      @deleteTask="taskStore.deleteTask"
      @toggleCompleted="taskStore.toggleTaskCompleted"
      @updateTask="taskStore.updateTask"
    />
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

  .filters {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
  }

  .filters button {
    padding: 8px 14px;
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
</style>
