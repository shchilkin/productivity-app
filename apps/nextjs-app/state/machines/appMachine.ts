import { createMachine, assign, AnyEventObject } from 'xstate'
import { createTask, deleteTask } from '@/utils/api/fetcher'
import { Task } from '@prisma/client'

interface AppMachineContext {
  activeTask: number | string | null
  tasks: Task[]
}

const setActiveTask = assign({
  activeTask: (context: AppMachineContext, event: { id: number | string }) => {
    console.log('event', event)
    console.log('context', context)
    return event.id
  },
})

const toggleTask = assign({
  tasks: (context: AppMachineContext, event: { id: number; TYPE: string }) => {
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

const createNewTask = async (context, event) => {
  console.log(event, 'create new task invoke')

  const { title, description, status, id } = event.task

  const task = await createTask({
    title: title,
    description: description,
    status: status,
  })

  return new Promise((resolve) => {
    resolve({ task: task, localId: id })
  })
}

const deleteItem = async (
  context: AppMachineContext,
  event: AnyEventObject
) => {
  return deleteTask({ id: event.id })
}

const appMachine = createMachine({
  predictableActionArguments: true,
  id: 'app',
  initial: 'idle',
  context: {
    activeTask: null,
    tasks: [],
  } as AppMachineContext,
  states: {
    idle: {
      on: {
        CREATE_TASK: {
          target: 'createTask',
          actions: [
            assign({
              tasks: (context: AppMachineContext, event) => {
                console.log(event, 'create task')
                return [...context.tasks, event.task]
              },
            }),
          ],
        },
        DELETE_TASK: {
          target: 'deleteTask',
        },
        SELECT_TASK: {
          target: 'editTask',
          actions: setActiveTask,
        },
        TOGGLE_TASK: {
          actions: toggleTask,
        },
      },
    },
    editTask: {
      on: {
        CANCEL: {
          target: 'idle',
          actions: assign({ activeTask: null }),
        },
        SELECT_TASK: {
          target: 'editTask',
          actions: setActiveTask,
        },
        DELETE_TASK: {
          target: 'deleteTask',
          actions: assign({
            tasks: (context: AppMachineContext, event) => {
              console.log(event, 'delete task')
              return context.tasks.filter((task) => task.id !== event.id)
            },
          }),
        },
        TOGGLE_ACTIVE_TASK: {
          target: 'editTask',
          actions: toggleTask,
        },
      },
    },
    createTask: {
      on: {
        CREATE_TASK: {
          target: 'createTask',
          actions: [
            assign({
              tasks: (context: AppMachineContext, event) => {
                console.log(event, 'create task')
                return [...context.tasks, event.task]
              },
            }),
          ],
        },
        TOGGLE_TASK: {
          actions: toggleTask,
        },
      },
      invoke: {
        id: 'createTask',
        src: createNewTask,
        onDone: {
          target: 'idle',
          actions: [
            () => console.log('task created'),
            assign({
              tasks: (context, event) => {
                // return [
                //   ...context.tasks.filter(
                //     (task) => task.id !== event.data.localId
                //   ),
                //   event.data.task,
                // ]
                return context.tasks.map((task) => {
                  if (task.id === event.data.localId) {
                    return { ...task, id: event.data.task.id }
                  } else {
                    return task
                  }
                })
              },
            }),
          ],
        },
        onError: {
          target: 'idle',
          actions: [() => console.log('error during creating task')],
        },
      },
    },
    deleteTask: {
      invoke: {
        id: 'deleteTask',
        src: (context, event) => deleteItem(context, event),
        onDone: {
          target: 'idle',
          actions: [
            assign({
              activeTask: null,
              tasks: (context, event) => {
                return context.tasks.filter((task) => task.id !== event.data.id)
              },
            }),
          ],
        },
        onError: {
          target: 'editTask',
          actions: () => console.log('error during deleting task'),
        },
      },
    },
  },
})

export default appMachine
