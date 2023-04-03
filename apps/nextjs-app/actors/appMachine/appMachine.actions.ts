import { assign } from 'xstate'
import { AppMachineContext } from '@/actors/appMachine/appMachine.types'
import { Task } from '@prisma/client'

// TODO: change name to mutateTaskLocally
export const mutateTask = assign({
  // TODO: add event types
  tasks: (context: AppMachineContext, event: any) => {
    return context.tasks.map((task: Task) => {
      if (task.id === event.id) {
        return {
          ...task,
          status: !task.status,
        }
      }
      return task
    }) as Task[]
  },
})
