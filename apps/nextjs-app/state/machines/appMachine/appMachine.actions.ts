import { assign } from 'xstate'
import { AppMachineContext } from '@/state/machines/appMachine/appMachine.types'

// TODO: change name to mutateTaskLocally
export const mutateTask = assign({
  // TODO: add types
  tasks: (context: AppMachineContext, event: any) => {
    return context.tasks.map((task) => {
      if (task.id === event.id) {
        return {
          ...task,
          status: !task.status,
        }
      }
      return task
    })
  },
})
