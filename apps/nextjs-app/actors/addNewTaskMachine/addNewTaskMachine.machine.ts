import {
  AddNewTaskMachineContext,
  AddNewTaskMachineState,
  UPDATE_LOCAL_CONTENT,
} from '@/actors/addNewTaskMachine/addNewTaskMachine.types'
import { assign } from 'xstate'

export const addNewTaskMachine = {
  schema: {
    context: {} as AddNewTaskMachineContext,
    states: {} as AddNewTaskMachineState,
  },
  predictableActionArguments: true,
  id: 'addNewTaskService',
  initial: 'cannotSave',
  context: { title: '', description: '' },
  states: {
    canSave: {
      always: {
        cond: 'cannotSave',
        target: 'cannotSave',
      },
      on: {
        SAVE_TASK: {
          target: 'saveTask',
          actions: () => console.log('Saving task'),
        },
      },
    },
    saveTask: {
      // TODO: Implement saving to server
      invoke: {
        id: 'savingTaskService',
        src: (context: AddNewTaskMachineContext) => {
          console.log('attempting to save task')
          const localTask = {
            title: context.title,
            description: context.description,
            status: false,
          }
          return new Promise((resolve) => {
            resolve(localTask)
          })
        },
        onDone: {
          target: 'saveAndCloseDialog',
          actions: [
            () => console.log('task saved'),
            () => console.log('exitDialog'),
          ],
        },
        onError: {
          target: 'cannotSave',
          actions: () => console.log('cannot save task'),
        },
      },
      actions: [() => console.log('saving task')],
    },
    saveAndCloseDialog: {
      type: 'final',
      data: {
        title: (context: AddNewTaskMachineContext) => {
          return context.title
        },
        description: (context: AddNewTaskMachineContext) => context.description,
        status: false,
      },
    },
    closeDialogWithoutSaving: {
      type: 'final',
      data: {
        noSave: true,
      },
    },
    cannotSave: {
      always: {
        cond: 'canSave',
        target: 'canSave',
      },
    },
  },
  on: {
    UPDATE_LOCAL_CONTEXT: {
      actions: [
        assign((context, event: UPDATE_LOCAL_CONTENT) => {
          const newContext: Partial<AddNewTaskMachineContext> = {}
          if (event.title !== undefined) {
            newContext.title = event.title
          }
          if (event.description !== undefined) {
            newContext.description = event.description
          }
          console.log(event, 'update local context')
          return newContext
        }),
      ],
    },
    CANCEL_SAVING: {
      target: 'closeDialogWithoutSaving',
    },
  },
}
