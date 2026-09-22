<script setup lang="ts">
    import {computed, ref, watch} from 'vue'
    import TaskForm from './components/TaskForm.vue'
    import type {Task} from './types'
    import TaskList from './components/TaskList.vue'

    const name = ref('')

    function loadSavedNames(): Task[] {
      const savedNames = localStorage.getItem('names')

      if (!savedNames) {
        return [
          {id: 1, title: 'Cleaning', completed: false},
          {id: 2, title: 'Running', completed: false},
          {id: 3, title: 'Coding', completed: false},
          {id: 4, title: 'Cooking', completed: false}
        ]
      }

      return JSON.parse(savedNames)
    }

    const tasks = ref<Task[]>(loadSavedNames())

    const selectedFilter = ref<'all' | 'active' | 'completed'>('all')

    let nextTaskId = tasks.value.length
      ? Math.max(...tasks.value.map(task => task.id)) + 1
      : 1

    watch(
      tasks,
      (newTasks) => {
        localStorage.setItem('names', JSON.stringify(newTasks))
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

    const tasksStartingWithI = computed (() =>
    tasks.value.filter(task => task.title.startsWith('I')))

    const filteredTasks = computed(() => {
      if (selectedFilter.value === 'active') {
        return tasks.value.filter(task => !task.completed)
      }

      if (selectedFilter.value === 'completed') {
        return tasks.value.filter(task => task.completed)
      }

      return tasks.value
    }

    )


    function handleDeleteTask(id: number){
      tasks.value= tasks.value.filter(task => task.id !== id)
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
  <h1>Hello {{name}}!</h1>

  <TaskForm  
  v-model:title="name"
  @addTask="handleAddTask"
  />

  <div>
    <button @click="selectedFilter = 'all'">
      all
    </button>

    <button @click="selectedFilter = 'active'">
      Active
    </button>

    <button @click="selectedFilter = 'completed'">
      Completed
    </button>
  </div>

  <div>
    <p>Total: {{totalTasks}}</p>
    <p>Active: {{activeTasks}}</p>
    <p>Completed: {{completedTasks}}</p>
  </div>

  <TaskList
  :tasks="filteredTasks"
  @deleteTask="handleDeleteTask"
  @toggleCompleted= "handleToggleCompleted"
  />

  <p>Tasks starting with I:</p>

  <ul>
    <li v-for="task in tasksStartingWithI" :key="task.id">
      {{task.title}}
    </li>
  </ul>

  <p v-if="name">Welcome {{name}}</p>

  <p v-else>Type your name 🚀</p>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
