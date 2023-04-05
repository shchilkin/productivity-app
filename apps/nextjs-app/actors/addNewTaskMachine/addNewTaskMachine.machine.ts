import { AddNewTaskMachineContext } from '@/actors/addNewTaskMachine/addNewTaskMachine.types'

export const addNewTaskMachine = {
  id: 'addNewTaskService',
  initial: 'cannotSave',
  predictableActionArguments: true,
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
        },
      },
    },
    cannotSave: {
      always: {
        cond: 'canSave',
        target: 'canSave',
      },
    },
    // TODO: simplify saveTask and remove saveAndCloseDialog or vice versa
    saveTask: {
      invoke: {
        id: 'saveTask',
        src: 'savingTaskService',
        onDone: {
          target: 'saveAndCloseDialog',
          actions: [() => console.log('task saved'), () => console.log('exitDialog')],
        },
      },
    },
    saveAndCloseDialog: {
      type: 'final',
      data: {
        title: (context: AddNewTaskMachineContext) => context.title as string,
        description: (context: AddNewTaskMachineContext) => context.description as string,
        status: false,
      },
    },
    closeDialogWithoutSaving: {
      type: 'final',
      data: {
        noSave: true,
      },
    },
  },
  on: {
    UPDATE_LOCAL_CONTEXT: {
      actions: 'updateLocalContext',
    },
    CANCEL_SAVING: {
      target: 'closeDialogWithoutSaving',
    },
  },
}

// export const addNewTaskMachine: MachineConfig<AddNewTaskMachineContext, AddNewTaskMachineEvents, AddNewTaskMachineState> = {
//   id: 'addNewTaskService',
//   initial: 'cannotSave',
//   predictableActionArguments: true,
//   context: { title: '', description: '' },
//   states: {
//     canSave: {
//       always: {
//         cond: 'cannotSave',
//         target: 'cannotSave',
//       },
//       on: {
//         SAVE_TASK: {
//           target: 'saveTask',
//           actions: () => console.log('Saving task'),
//         },
//       },
//     },
//     saveTask: {
//       // TODO: Implement saving to server
//       invoke: {
//         id: 'savingTaskService',
//         src: (context: AddNewTaskMachineContext) => {
//           console.log('attempting to save task')
//           const localTask = {
//             title: context.title,
//             description: context.description,
//             status: false,
//           }
//           return new Promise((resolve) => {
//             resolve(localTask)
//           })
//         },
//         onDone: {
//           target: 'saveAndCloseDialog',
//           actions: [() => console.log('task saved'), () => console.log('exitDialog')],
//         },
//         onError: {
//           target: 'cannotSave',
//           actions: () => console.log('cannot save task'),
//         },
//       },
//       actions: [() => console.log('saving task')],
//     },
//     saveAndCloseDialog: {
//       type: 'final',
//       data: {
//         title: (context: AddNewTaskMachineContext) => {
//           return context.title as string
//         },
//         description: (context: AddNewTaskMachineContext) => context.description as string,
//         status: false,
//       },
//     },
//     closeDialogWithoutSaving: {
//       type: 'final',
//       data: {
//         noSave: true,
//       },
//     },
//     cannotSave: {
//       always: {
//         cond: 'canSave',
//         target: 'canSave',
//       },
//     },
//   },
//   on: {
//     UPDATE_LOCAL_CONTEXT: {
//       actions: [
//         assign((context, event: UPDATE_LOCAL_CONTENT) => {
//           const newContext: Partial<AddNewTaskMachineContext> = {}
//           if (event.title !== undefined) {
//             newContext.title = event.title
//           }
//           if (event.description !== undefined) {
//             newContext.description = event.description
//           }
//           return context
//         }),
//       ],
//     },
//     CANCEL_SAVING: {
//       target: 'closeDialogWithoutSaving',
//     },
//   },
// }
