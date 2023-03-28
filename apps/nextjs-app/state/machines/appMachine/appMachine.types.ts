import { Task } from '@prisma/client'

export interface AppMachineContext {
  activeTask: number | string | null
  tasks: Task[]
}

export enum AppMachineEvents {
  TOGGLE_TASK = 'TOGGLE_TASK',
  SELECT_TASK = 'SELECT_TASK',
  CREATE_TASK = 'CREATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
}

export interface ToggleTaskEvent {
  task: Task
  TYPE: AppMachineEvents.TOGGLE_TASK
}
