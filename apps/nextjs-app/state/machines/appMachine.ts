import { createMachine, assign } from 'xstate'
import { createTask } from '@/utils/api/fetcher'
import idGenerator from '@/utils/idGenerator/idGenerator'

const setActiveTask = assign({
  activeTask: (context, event: { id: number | string }) => {
    console.log('event', event)
    console.log('context', context)
    return event.id
  },
})

const id = idGenerator()
const createNewTask = async () => {
  console.log('create new task flow')
  return createTask({
    title: `Task ${id.next().value}`,
    description: 'Description',
    status: false,
  })
}

const appMachine = createMachine({
  predictableActionArguments: true,
  id: 'app',
  initial: 'idle',
  context: {
    activeTask: null,
  },
  states: {
    idle: {
      on: {
        CREATE_TASK: {
          target: 'createTask',
        },
        editTask: {
          target: 'editTask',
          actions: setActiveTask,
        },
      },
    },
    editTask: {
      on: {
        CANCEL: {
          target: 'idle',
          actions: assign({ activeTask: null }),
        },
        editTask: {
          target: 'editTask',
          actions: setActiveTask,
        },
      },
    },
    createTask: {
      invoke: {
        id: 'createTask',
        src: createNewTask,
        onDone: {
          target: 'idle',
          actions: () => console.log('task created'),
        },
        onError: {
          target: 'idle',
          actions: () => console.log('error during creating task'),
        },
      },
    },
  },
})

export default appMachine
