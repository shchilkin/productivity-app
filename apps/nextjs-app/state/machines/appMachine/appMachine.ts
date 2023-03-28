import { createMachine, assign, AnyEventObject } from 'xstate'
import { createTask, deleteTask, updateTask } from '@/utils/api/fetcher'
import {
  AppMachineContext,
  ToggleTaskEvent,
} from '@/state/machines/appMachine/appMachine.types'
import { mutateTask } from '@/state/machines/appMachine/appMachine.actions'

const setActiveTask = assign({
  activeTask: (context: AppMachineContext, event: { id: number | string }) => {
    console.log('event', event)
    console.log('context', context)
    return event.id
  },
})

const createNewTask = async (
  // TODO: Add types
  context: any,
  event: any
) => {
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

const updateItem = async (
  context: AppMachineContext,
  event: AnyEventObject
) => {
  console.log('updateItem Call', event)
  const task = context.tasks.find((task) => task.id === event.id)
  if (!task) return new Promise((resolve, reject) => reject('Task not found'))
  const { title, description, status, id } = task
  return updateTask({
    id: id,
    title: title,
    description: description,
    status: status,
  })
}

const updateItemV2 = async (
  context: AppMachineContext,
  event: AnyEventObject
) => {
  console.log('updateItem Call', event)
  const task = context.tasks.find((task) => task.id === event.task.id)
  if (!task) return new Promise((resolve, reject) => reject('Task not found'))
  const { title, description, status, id } = task
  return updateTask({
    id: id,
    title: title,
    description: description,
    status: status,
  })
}

export const mutateLocalTask = assign({
  tasks: (context: AppMachineContext, event: ToggleTaskEvent) => {
    const newTasks = context.tasks.map((task) => {
      // @ts-inspect-error TODO: add types
      if (task.id === event.task.id) {
        return {
          ...event.task,
        }
      }
      return task
    })
    console.log(newTasks)
    return newTasks
  },
})

const appMachine = createMachine(
  {
    schema: {
      context: {} as AppMachineContext,
      // TODO: Add event types
      events: {} as any,
      // TODO: Add action types
      actions: {} as any,
      // TODO: Add guard types
      guards: {} as any,
      // TODO: Add service types
      services: {} as any,
    },
    predictableActionArguments: true,
    id: 'app',
    initial: 'idle',
    context: {
      activeTask: null,
      tasks: [],
    },
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
            actions: 'setActiveTask',
          },
          TOGGLE_TASK: {
            target: 'toggleTask',
            actions: 'mutateTask',
          },
        },
      },
      syncUpdatedTaskWithServer: {
        invoke: {
          id: 'syncUpdatedTaskWithServer',
          src: (context, event) => {
            console.warn(context, event, 'syncUpdatedTaskWithServer')
            return updateItemV2(context, event)
          },
          onDone: {
            target: 'idle',
            actions: () => console.log('synced updated task with server'),
          },
          onError: {
            target: 'idle',
            actions: 'showError',
          },
        },
      },
      toggleTask: {
        //   TODO: update service here
        on: {
          TOGGLE_TASK: {
            target: 'toggleTask',
            actions: 'mutateTask',
          },
        },
        invoke: {
          id: 'sendUpdatedTaskDataToServer',
          src: 'sendUpdatedTaskDataToServerService',
          onDone: {
            target: 'idle',
            actions: [(context, event) => console.log(event, 'toggle task')],
            //   Send updated task data to server
            //   Sync client data with server data
          },
          onError: {
            target: 'idle',
            actions: 'showError',
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
            actions: 'setActiveTask',
          },
          DELETE_TASK: {
            target: 'deleteTask',
            actions: assign({
              tasks: (context: AppMachineContext, event) => {
                return context.tasks.filter((task) => task.id !== event.id)
              },
            }),
          },
          TOGGLE_ACTIVE_TASK: {
            target: 'editTask',
            actions: 'mutateTask',
          },
          UPDATE_TASK: {
            target: 'syncUpdatedTaskWithServer',
            actions: [
              (context, event) => console.log(context, event),
              'mutateLocalTask',
              assign({ activeTask: null }),
            ],
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
            actions: 'mutateTask',
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
            actions: 'showError',
          },
        },
      },
      deleteTask: {
        invoke: {
          id: 'deleteTask',
          src: 'deleteTaskService',
          onDone: {
            target: 'idle',
            actions: [
              assign({
                activeTask: null,
                tasks: (context, event) => {
                  return context.tasks.filter(
                    (task) => task.id !== event.data.id
                  )
                },
              }),
            ],
          },
          onError: {
            target: 'editTask',
            actions: 'showError',
          },
        },
      },
    },
  },
  {
    services: {
      deleteTaskService: (context, event) => deleteItem(context, event),
      sendUpdatedTaskDataToServerService: (context, event) =>
        updateItem(context, event),
    },
    actions: {
      // @ts-expect-error TODO: refactor machine and fix this
      setActiveTask,
      // @ts-expect-error TODO: refactor machine and fix this
      mutateTask,
      // @ts-expect-error TODO: refactor machine and fix this
      mutateLocalTask,
      // @ts-expect-error TODO: refactor machine and fix this
      updateTask,
      showError: (context, event) =>
        console.log('error during event', event, context),
    },
    guards: {},
  }
)

export default appMachine
