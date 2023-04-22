import { GlobalStateContext } from '@/components/AppClientSide';
import { useInterpret } from '@xstate/react';
import { appMachine } from '@/actors';
import { Decorator, StoryFn } from '@storybook/react';
import mockTask from '@/utils/mock/mockTask/mockTask';
import { Task } from '@prisma/client';

// create array of mock tasks
const tasks: Task[] = [];
for (let i = 0; i < 10; i++) {
  tasks.push(mockTask({}));
}
const WithGlobalServices: Decorator = (Story: StoryFn) => {
  const appService = useInterpret(appMachine, {
    context: {
      activeTask: null,
      tasks: tasks,
      activeTab: 'inbox',
      sidebarOpen: true,
    },
    devTools: true,
  });
  return (
    <GlobalStateContext.Provider value={{ appService }}>
      <Story />
    </GlobalStateContext.Provider>
  );
};

export default WithGlobalServices;
