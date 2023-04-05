import { createMachine } from 'xstate'
import { cannotSave, canSave } from '@/actors/addNewTaskMachine/addNewTaskMachine.guards'
import { updateLocalContext } from '@/actors/addNewTaskMachine/addNewTaskMachine.actions'
import { savingTaskService } from '@/actors/addNewTaskMachine/addNeTaskMachine.services'
import { addNewTaskMachine } from '@/actors/addNewTaskMachine/addNewTaskMachine.machine'

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const addNewTaskService = createMachine(addNewTaskMachine, {
  guards: {
    canSave,
    cannotSave,
  },
  services: {
    savingTaskService,
  },
  actions: {
    updateLocalContext,
  },
})
