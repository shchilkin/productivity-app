import { createMachine, assign } from 'xstate'
import { createTask, deleteTask, updateTask } from '@/utils/api/fetcher'
import { addNewTaskService } from '@/actors/addNewTaskMachine/addNewTaskMachine'
import { mutateTask } from '@/actors/appMachine/appMachine.actions'
import { AppMachineContext } from '@/actors/appMachine/appMachine.types'
import { Task } from '@prisma/client'

// TODO: add types
const setActiveTask = assign({
  activeTask: (_context, event) => event.id as string,
})

// TODO: add types
const deleteItem = async (_context, event) => (await deleteTask({ id: event.id })) as Promise<void>

// TODO: add types
const updateItem = async (context, event) => {
  // TODO: add types
  const task = context.tasks.find((task) => task.id === event.id)
  if (!task) return Promise.reject('Task not found')
  return (await updateTask(task)) as unknown as Promise<void>
}

export const mutateLocalTask = assign({
  tasks: (context, event) => {
    // TODO: add types
    return context.tasks.map((task) => {
      // TODO: add types
      if (task.id === event.task.id) {
        // TODO: add types
        return { ...event.task } as Task
      }
      return task as Task
    }) as Task[]
  },
})

const appMachine = createMachine<AppMachineContext>(
  {
    id: 'appMachine',
    initial: 'idle',
    context: {
      activeTask: null,
      tasks: [],
    },
    states: {
      idle: {
        on: {
          CREATE_TASK: 'createTask',
          DELETE_TASK: 'deleteTask',
          SELECT_TASK: { target: 'editTask', actions: 'setActiveTask' },
          TOGGLE_TASK: { target: 'toggleTask', actions: 'mutateTask' },
        },
      },
      toggleTask: {
        on: { TOGGLE_TASK: { target: 'toggleTask', actions: 'mutateTask' } },
        invoke: {
          id: 'sendUpdatedTaskDataToServer',
          src: 'sendUpdatedTaskDataToServerService',
          onDone: {
            target: 'idle',
            actions: (_context, event) => console.log(event, 'toggle task'),
          },
          onError: { target: 'idle', actions: 'showError' },
        },
      },
      editTask: {
        on: {
          CANCEL: { target: 'idle', actions: assign({ activeTask: null }) },
          SELECT_TASK: { target: 'editTask', actions: 'setActiveTask' },
          DELETE_TASK: {
            target: 'deleteTask',
            actions: assign({
              tasks: (context, event) => context.tasks.filter((task) => task.id !== event.id) as Task[],
            }),
          },
          TOGGLE_ACTIVE_TASK: { target: 'editTask', actions: 'mutateTask' },
          UPDATE_TASK: {
            target: 'syncUpdatedTaskWithServer',
            actions: ['mutateLocalTask', assign({ activeTask: null })],
          },
        },
      },
      createTask: {
        invoke: {
          id: 'addNewTaskService',
          src: 'addNewTaskService',
          onDone: [
            {
              target: 'syncLocalTasksWithServer',
              cond: (_context, event) => !event.data.noSave,
              actions: assign({
                tasks: (context, event) => {
                  if (event.data) return [...context.tasks, { ...event.data }] as Task[]
                  return context.tasks as Task[]
                },
              }),
            },
            {
              target: 'idle',
              cond: (_context, event) => event.data.noSave as boolean,
            },
          ],
          onError: { target: 'idle', actions: 'showError' },
        },
      },
      deleteTask: {
        invoke: {
          id: 'deleteTask',
          src: 'deleteTaskService',
          onDone: {
            target: 'idle',
            actions: assign({
              activeTask: null,
              tasks: (context, event) => context.tasks.filter((task) => task.id !== event.data.id) as Task[],
            }),
          },
          onError: { target: 'editTask', actions: 'showError' },
        },
      },
      syncUpdatedTaskWithServer: {
        invoke: {
          id: 'syncUpdatedTaskWithServer',
          src: (context, event) => updateItem(context, event),
          onDone: {
            target: 'idle',
            actions: () => console.log('synced updated task with server'),
          },
          onError: { target: 'idle', actions: 'showError' },
        },
      },
      syncLocalTasksWithServer: {
        invoke: {
          id: 'syncLocalTasksWithServer',
          src: (_context, event) => createTask(event.data) as unknown as Promise<void>,
          onDone: {
            target: 'idle',
            actions: (_context, event) => console.log('synced local tasks with server', event),
          },
          onError: { target: 'idle', actions: 'showError' },
        },
      },
    },
  },
  {
    services: {
      deleteTaskService: (context, event) => deleteItem(context, event),
      sendUpdatedTaskDataToServerService: (context, event) => updateItem(context, event),
      addNewTaskService,
    },
    actions: {
      setActiveTask,
      mutateTask,
      mutateLocalTask,
      showError: (context, event) => console.log('error during event', event, context),
    },
  }
)

export default appMachine
