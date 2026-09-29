import type { TaskApiResponse } from '../types'

function isTaskApiResponse(value: unknown): value is TaskApiResponse {
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

export async function fetchTask(): Promise<TaskApiResponse> {
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

  return data
}