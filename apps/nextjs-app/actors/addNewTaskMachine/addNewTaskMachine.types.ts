import { InvokeDefinition, StateSchema } from 'xstate'

export interface AddNewTaskMachineContext {
  title: string
  description: string
}

export type AddNewTaskMachineState =
  | {
      value: 'canSave'
      context: AddNewTaskMachineContext
    }
  | {
      value: 'saveTask'
      context: AddNewTaskMachineContext
      id: 'addNewTaskService'
    }
  | {
      value: 'closeDialogWithoutSaving'
      type: 'final'
      context: AddNewTaskMachineContext
    }
  | {
      value: 'saveAndCloseDialog'
      type: 'final'
      context: AddNewTaskMachineContext
    }
  | {
      value: 'cannotSave'
      context: AddNewTaskMachineContext
    }

export type UPDATE_LOCAL_CONTENT = {
  type: 'UPDATE_LOCAL_CONTENT'
  title?: string
  description?: string
  action?: string
}

export type CANCEL_SAVING = {
  type: 'CANCEL_SAVING'
}

export type SAVE_TASK = {
  type: 'SAVE_TASK'
}

export type AddNewTaskMachineEvents = UPDATE_LOCAL_CONTENT | CANCEL_SAVING | SAVE_TASK

export type addNewTaskMachineServiceMap = {
  savingTaskService: InvokeDefinition<AddNewTaskMachineContext, AddNewTaskMachineEvents>
}

export interface AddNewTaskMachineStateSchema extends StateSchema<AddNewTaskMachineState> {
  states: {
    canSave: object
    cannotSave: object
    saveTask: object
    saveAndCloseDialog: object
    closeDialogWithoutSaving: object
  }
}
