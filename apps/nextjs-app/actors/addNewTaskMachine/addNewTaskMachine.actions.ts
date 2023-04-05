import { assign } from 'xstate'
import { AddNewTaskMachineContext, UPDATE_LOCAL_CONTENT } from '@/actors/addNewTaskMachine/addNewTaskMachine.types'
export const updateLocalContext = assign<AddNewTaskMachineContext, UPDATE_LOCAL_CONTENT>((context, event) => {
  const newContext: Partial<AddNewTaskMachineContext> = context
  if (event.title !== undefined) {
    newContext.title = event.title
  }
  if (event.description !== undefined) {
    newContext.description = event.description
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return context as AddNewTaskMachineContext
})
