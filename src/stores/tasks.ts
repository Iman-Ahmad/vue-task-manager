import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '../types'
import { fetchTasks } from '../services/taskApi'

function loadSavedTasks(): Task[] {
  const savedTasks = localStorage.getItem('tasks')

  if (!savedTasks) {
    return [
      {
        id: 1,
        title: 'Cleaning',
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: 'Running',
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        title: 'Coding',
        completed: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 4,
        title: 'Cooking',
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]
  }

  return JSON.parse(savedTasks)
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>(loadSavedTasks())

  const apiTasks = ref<Task[]>([])
  const isApiLoading = ref(false)
  const apiError = ref('')

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

  function addTask(title: string): string | null {
    if (!title.trim()) {
      return `Task title is required`
    }

    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(title)) {
      return `Task title can only contain letters and spaces`
    }

    tasks.value.push({
      id: nextTaskId,
      title: title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    })

    nextTaskId++

    return null
  }

  function deleteTask(id: number) {
    tasks.value = tasks.value.filter(task => task.id !== id)
  }

  function updateTask(id:number, title: string) {
    if (!title.trim()) {
      return
    }

    const task = tasks.value.find(task => task.id === id)

    if (!task) {
      return
    }

    task.title = title.trim()
  }

  function toggleTaskCompleted(id: number) {
    const task = tasks.value.find(task => task.id === id)

    if (!task) {
      return
    }

    task.completed = !task.completed
  }

  function clearCompletedTasks() {
    tasks.value = tasks.value.filter(task => !task.completed)
  }

  async function loadApiTasks(): Promise<void> {
    isApiLoading.value = true
    apiError.value = ''

    try {
      const loadedTasks = await fetchTasks()

      apiTasks.value = loadedTasks
    }

    catch(error){
      apiError.value = 'Failed to load tasks from API.'
      console.error('API request failed: ', error)
    }

    finally {
      isApiLoading.value = false
    }
  }

  return {
    tasks,
    addTask,
    deleteTask,
    updateTask,
    toggleTaskCompleted,
    clearCompletedTasks,
    apiTasks,
    isApiLoading,
    apiError,
    loadApiTasks,
  }
})