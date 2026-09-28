export type TaskFilter = 'all' | 'active' | 'completed'

export interface TaskMetadata {
  createdAt: string
  updatedAt?: string
}

export interface Task extends TaskMetadata {
  id: number
  title: string
  completed: boolean
}

export interface TaskApiResponse {
  id: number
  title: string
  completed: boolean
}