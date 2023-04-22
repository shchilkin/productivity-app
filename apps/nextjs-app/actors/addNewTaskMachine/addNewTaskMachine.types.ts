export interface AddNewTaskMachineContext {
  title: string;
  description: string;
}

export type AddNewTaskMachineState =
  | {
      value: 'canSave';
      context: AddNewTaskMachineContext;
    }
  | {
      value: 'saveTask';
      context: AddNewTaskMachineContext;
    }
  | {
      value: 'closeDialogWithoutSaving';
      type: 'final';
      context: AddNewTaskMachineContext;
    }
  | {
      value: 'saveAndCloseDialog';
      type: 'final';
      context: AddNewTaskMachineContext;
    }
  | {
      value: 'cannotSave';
      context: AddNewTaskMachineContext;
    };

export type UPDATE_LOCAL_CONTENT = {
  type: 'UPDATE_LOCAL_CONTENT';
  title?: string;
  description?: string;
};

export type CANCEL_SAVING = {
  type: 'CANCEL_SAVING';
};
