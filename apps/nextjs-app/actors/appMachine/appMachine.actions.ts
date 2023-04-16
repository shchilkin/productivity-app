import { assign } from 'xstate';
import { AppMachineContext, SetActiveTabEvent } from '@/actors/appMachine/appMachine.types';

// TODO: change name to mutateTaskLocally
export const mutateTask = assign({
  // TODO: add types
  tasks: (context: AppMachineContext, event: any) => {
    return context.tasks.map((task: any) => {
      if (task.id === event.id) {
        return {
          ...task,
          status: !task.status,
        };
      }
      return task;
    });
  },
});

export const toggleSidebar = assign({
  sidebarOpen: (context: AppMachineContext) => !context.sidebarOpen,
});

export const setActiveTab = assign({
  activeTab: (context: AppMachineContext, event: SetActiveTabEvent) => event.payload,
});
