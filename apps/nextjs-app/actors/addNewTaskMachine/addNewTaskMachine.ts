import { assign, createMachine } from 'xstate'

interface AddNewTaskMachineContext {
  title: string
  description: string
}

const addNewTaskMachine = {
  schema: {
    context: {} as AddNewTaskMachineContext,
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
        UPDATE_LOCAL_CONTEXT: {
          actions: [
            assign({
              title: (
                context,
                event: { type: 'UPDATE_LOCAL_CONTEXT'; title: string }
              ) => {
                console.log(context, event, 'update local title CAN SAVE')
                return event.title
              },
            }),
          ],
        },
        UPDATE_LOCAL_DESCRIPTION: {
          actions: [
            assign({
              description: (
                context,
                event: { type: 'UPDATE_LOCAL_CONTEXT'; description: string }
              ) => {
                console.log(context, event, 'update local description CAN SAVE')
                return event.description
              },
            }),
          ],
        },
        CANCEL_SAVING: {
          target: 'closeDialogWithoutSaving',
          actions: (context: any, event: any) =>
            console.log(context, event, 'Close dialog without saving'),
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

          // return createTask(localTask)

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
    // Todo: rename save task and close dialog
    saveAndCloseDialog: {
      type: 'final',
      data: {
        saving: true,
        // @ts-expect-error TODO: add types
        title: (context, event) => {
          console.log(context, event, 'exitDialog')
          return context.title
        },
        // @ts-expect-error TODO: add types
        description: (context) => context.description,
        status: false,
      },
    },
    closeDialogWithoutSaving: {
      type: 'final',
      data: {
        saving: false,
      },
    },
    cannotSave: {
      always: {
        cond: 'canSave',
        target: 'canSave',
      },
      on: {
        // TODO: RENAME TO UPDATE_LOCAL_TITLE
        UPDATE_LOCAL_CONTEXT: {
          actions: [
            assign({
              title: (context, event) => {
                console.log(context, event, 'update local title CANNOT SAVE')
                // @ts-expect-error TODO: add event types
                return event.title
              },
            }),
          ],
        },
        UPDATE_LOCAL_DESCRIPTION: {
          actions: [
            assign({
              description: (context, event) => {
                console.log(
                  context,
                  event,
                  'update local description CANNOT SAVE'
                )
                // @ts-expect-error TODO: add event types
                return event.description
              },
            }),
          ],
        },
        CANCEL_SAVING: {
          target: 'closeDialogWithoutSaving',
          actions: (context: any, event: any) =>
            console.log(context, event, 'Close dialog without saving'),
        },
      },
    },
  },
}

// @ts-expect-error TODO: Fix machine typing
export const addNewTaskService = createMachine(addNewTaskMachine, {
  guards: {
    canSave: (context) => {
      console.log('canSave', context.title.replace(/\s+/g, '').length > 0)
      return context.title.replace(/\s+/g, '').length > 0
    },
    cannotSave: (context) => {
      console.log('cannotSave', context.title.length === 0)
      return context.title.length === 0
    },
  },
})
