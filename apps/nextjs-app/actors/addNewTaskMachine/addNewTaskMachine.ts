import { createMachine, StateMachine } from 'xstate'
import { cannotSave, canSave } from '@/actors/addNewTaskMachine/addNewTaskMachine.guards'
import { addNewTaskMachine } from '@/actors/addNewTaskMachine/addNewTaskMachine.machine'
import { AddNewTaskMachineContext, AddNewTaskMachineState } from '@/actors/addNewTaskMachine/addNewTaskMachine.types'

export const addNewTaskService = createMachine<
  AddNewTaskMachineContext,
  any,
  AddNewTaskMachineState
  //   @ts-expect-error TODO: add types
>(addNewTaskMachine as StateMachine<AddNewTaskMachineContext, any, AddNewTaskMachineState>, {
  guards: {
    canSave,
    cannotSave,
  },
})
