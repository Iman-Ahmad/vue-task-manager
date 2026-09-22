import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Task } from '../types'

function loadSavedTasks(): Task[] {
  const savedTasks = localStorage.getItem('tasks')

  if (!savedTasks) {
    return [
      { id: 1, title: 'Cleaning', completed: false },
      { id: 2, title: 'Running', completed: false },
      { id: 3, title: 'Coding', completed: false },
      { id: 4, title: 'Cooking', completed: false },
    ]
  }

  return JSON.parse(savedTasks)
}

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref<Task[]>(loadSavedTasks())

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

  function addTask(title: string) {
    if (!title.trim()) {
      return
    }

    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(title)) {
      return
    }

    tasks.value.push({
      id: nextTaskId,
      title: title.trim(),
      completed: false,
    })

    nextTaskId++
  }

  function deleteTask(id: number) {
    tasks.value = tasks.value.filter(task => task.id !== id)
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

  return {
    tasks,
    addTask,
    deleteTask,
    toggleTaskCompleted,
    clearCompletedTasks,
  }
})