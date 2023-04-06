import { AddNewTaskMachineContext } from '@/actors/addNewTaskMachine/addNewTaskMachine.types';

export const canSave = (context: AddNewTaskMachineContext) => {
  console.log('canSave', context.title.replace(/\s+/g, '').length > 0);
  return context.title.replace(/\s+/g, '').length > 0;
};
export const cannotSave = (context: AddNewTaskMachineContext) => {
  console.log('cannotSave', context.title.length === 0);
  return context.title.length === 0;
};
