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

export type FilterChangeHandler = (filter: TaskFilter) => void