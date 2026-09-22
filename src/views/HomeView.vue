<script setup lang="ts">
    import {computed, ref, watch} from 'vue'
    import TaskForm from '../components/TaskForm.vue'
    import type {Task} from '../types'
    import TaskList from '../components/TaskList.vue'

    const taskTitle = ref('')

    function loadSavedTasks(): Task[] {
      const savedTasks = localStorage.getItem('tasks')

      if (!savedTasks) {
        return [
          {id: 1, title: 'Cleaning', completed: false},
          {id: 2, title: 'Running', completed: false},
          {id: 3, title: 'Coding', completed: false},
          {id: 4, title: 'Cooking', completed: false}
        ]
      }

      return JSON.parse(savedTasks)
    }

    const tasks = ref<Task[]>(loadSavedTasks())

    const selectedFilter = ref<'all' | 'active' | 'completed'>('all')

    let nextTaskId = tasks.value.length
      ? Math.max(...tasks.value.map(task => task.id)) + 1
      : 1

    watch(
      tasks,
      (newTasks) => {
        localStorage.setItem('tasks', JSON.stringify(newTasks))
      },
      { deep: true }
    )

    const totalTasks = computed (() => tasks.value.length)

    const completedTasks = computed (() =>
    tasks.value.filter(task => task.completed).length
    )

    const activeTasks = computed (() =>
    tasks.value.filter(task => !task.completed).length
    )


    const filteredTasks = computed(() => {
      if (selectedFilter.value === 'active') {
        return tasks.value.filter(task => !task.completed)
      }

      if (selectedFilter.value === 'completed') {
        return tasks.value.filter(task => task.completed)
      }

      return tasks.value
    })


    function handleDeleteTask(id: number){
      tasks.value= tasks.value.filter(task => task.id !== id)
    }

    function handleClearCompleted(){
      tasks.value = tasks.value.filter(task => !task.completed)
    }

    function handleToggleCompleted(id: number) {
      const task= tasks.value.find(task => task.id === id)

      if (!task) {
        return
      }

      task.completed = !task.completed
    }

    function handleAddTask(title: string) {
      if (!title.trim()){
        return
      }

      if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(title)){
        return
      }

      tasks.value.push({
        id: nextTaskId,
        title: title,
        completed: false
      })
      nextTaskId++
    }
</script>

<template>
  <main class="page">
    <h1>Ready to complete your tasks?!</h1>

    <div class="task-form">
    <TaskForm  
    v-model:title="taskTitle"
    @addTask="handleAddTask"
    />
    </div>

    <div class="filters">
      <button @click="selectedFilter = 'all'">
        all
      </button>

      <button @click="selectedFilter = 'active'">
        Active
      </button>

      <button @click="selectedFilter = 'completed'">
        Completed
      </button>

      <button @click="handleClearCompleted">
        Clear completed tasks
      </button>
    </div>

    <div class="task-counts">
      <div>Total: {{totalTasks}}</div>
      <div>Active: {{activeTasks}}</div>
      <div>Completed: {{completedTasks}}</div>
    </div>

    <TaskList
    :tasks="filteredTasks"
    @deleteTask="handleDeleteTask"
    @toggleCompleted= "handleToggleCompleted"
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
