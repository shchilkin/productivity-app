import { Task } from '@prisma/client';

export interface AppMachineContext {
  activeTask: number | string | null;
  tasks: Task[];
  sidebarOpen: boolean;

  activeTab: 'today' | 'inbox' | 'completed';
}

export enum AppMachineEvents {
  TOGGLE_TASK = 'TOGGLE_TASK',
  SELECT_TASK = 'SELECT_TASK',
  CREATE_TASK = 'CREATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
  SET_ACTIVE_TAB = 'SET_ACTIVE_TAB',
}

export interface ToggleTaskEvent {
  task: Task;
  TYPE: AppMachineEvents.TOGGLE_TASK;
}

export interface SetActiveTabEvent {
  type: AppMachineEvents.SET_ACTIVE_TAB;
  payload: 'today' | 'inbox' | 'completed';
}

export type typeAppMachineEvent = ToggleTaskEvent;
