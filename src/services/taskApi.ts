import type { Task, ApiTask } from '../types'

function isTaskApiResponse(value: unknown): value is ApiTask {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const data = value as Record<string, unknown>

  return (
    typeof data.id === 'number' &&
    typeof data.title === 'string' &&
    typeof data.completed === 'boolean'
  )
}

function isTaskApiResponseList(value: unknown): value is ApiTask[] {
  return (
    Array.isArray(value) && value.every(isTaskApiResponse)
  )
}

function mapApiTaskToTask(apiTask: ApiTask): Task {
    return {
        id: apiTask.id,
        title: apiTask.title,
        completed: apiTask.completed,
        createdAt: new Date().toISOString(),
    }
}

export async function fetchTask(): Promise<Task> {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/todos/1'
  )

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const data: unknown = await response.json()

  if (!isTaskApiResponse(data)) {
    throw new Error('Invalid task data received from API')
  }

  return mapApiTaskToTask(data)
}

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos')

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const data: unknown = await response.json()

  if (!isTaskApiResponseList(data)) {
    throw new Error(`Invalid task list received from API`)
  }

  return data.map(mapApiTaskToTask)
}