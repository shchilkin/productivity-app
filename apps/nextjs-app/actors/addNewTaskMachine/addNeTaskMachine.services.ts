import { AddNewTaskMachineContext } from '@/actors/addNewTaskMachine/addNewTaskMachine.types'

export const savingTaskService = (
  context: AddNewTaskMachineContext
): Promise<{ title: string; description: string; status: boolean }> => {
  console.log('attempting to save task')
  const localTask = {
    title: context.title,
    description: context.description,
    status: false,
  }
  return new Promise((resolve) => {
    resolve(localTask)
  })
}
