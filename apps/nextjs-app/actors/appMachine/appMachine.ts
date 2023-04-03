import { createMachine, assign } from 'xstate'
import { createTask, deleteTask, updateTask } from '@/utils/api/fetcher'
import { addNewTaskService } from '@/actors/addNewTaskMachine/addNewTaskMachine'
import { mutateTask } from '@/actors/appMachine/appMachine.actions'
import { AppMachineContext } from '@/actors/appMachine/appMachine.types'

const setActiveTask = assign({
  // @ts-expect-error TODO: add types
  activeTask: (context, event) => event.id,
})

// @ts-expect-error TODO: add types
const deleteItem = async (context, event) => deleteTask({ id: event.id })

// @ts-expect-error TODO: add types
const updateItem = async (context, event) => {
  // @ts-expect-error TODO: add types
  const task = context.tasks.find((task) => task.id === event.id)
  if (!task) return Promise.reject('Task not found')
  return updateTask(task)
}

export const mutateLocalTask = assign({
  tasks: (context, event) => {
    // @ts-expect-error TODO: add types
    return context.tasks.map((task) => {
      // @ts-expect-error TODO: add types
      if (task.id === event.task.id) {
        // @ts-expect-error TODO: add types
        return { ...event.task }
      }
      return task
    })
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
            actions: (context, event) => console.log(event, 'toggle task'),
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
              tasks: (context, event) => context.tasks.filter((task) => task.id !== event.id),
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
              cond: (context, event) => !event.data.noSave,
              actions: assign({
                tasks: (context, event) => {
                  if (event.data) return [...context.tasks, { ...event.data }]
                  return context.tasks
                },
              }),
            },
            {
              target: 'idle',
              cond: (context, event) => event.data.noSave,
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
              tasks: (context, event) => context.tasks.filter((task) => task.id !== event.data.id),
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
          src: (context, event) => createTask(event.data),
          onDone: {
            target: 'idle',
            actions: (context, event) => console.log('synced local tasks with server', event),
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
