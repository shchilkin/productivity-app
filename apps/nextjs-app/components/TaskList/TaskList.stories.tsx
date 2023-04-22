import TaskList from '@/components/TaskList/index';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { GlobalStateContext } from '@/components/AppClientSide';
import { useInterpret } from '@xstate/react';
import { appMachine } from '@/actors';
import { Task } from '@prisma/client';
import mockTask from '@/utils/mock/mockTask/mockTask';
import { AppMachineContext } from '@/actors/appMachine/appMachine.types';

const meta: Meta = {
  title: 'Task/TaskList',
  component: TaskList,
  decorators: [
    (Story: StoryFn) => (
      <div className="border-gray-100 border-2 px-2 py-1 rounded-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TaskList>;

const tasks: Task[] = [];
for (let i = 0; i < 10; i++) {
  tasks.push(mockTask({}));
}

interface GlobalServicesProps {
  context: Partial<AppMachineContext>;
  children: React.ReactNode;
}

const GlobalServices = ({ context, children }: GlobalServicesProps) => {
  const appService = useInterpret(appMachine, {
    context: {
      activeTask: context.activeTask || null,
      tasks: context.tasks || [],
      activeTab: context.activeTab || 'inbox',
      sidebarOpen: context.sidebarOpen || true,
    },
    devTools: true,
  });

  return <GlobalStateContext.Provider value={{ appService }}>{children}</GlobalStateContext.Provider>;
};

const DefaultGlobalServices = (Story: StoryFn) => (
  <GlobalServices
    context={{
      activeTask: null,
      tasks: Array(3)
        .fill(null)
        .map(() => mockTask({ status: false })),
      activeTab: 'today',
      sidebarOpen: true,
    }}
  >
    <Story />
  </GlobalServices>
);

const EmptyTasksGlobalServices = (Story: StoryFn) => (
  <GlobalServices
    context={{
      activeTask: null,
      tasks: [],
      activeTab: 'inbox',
      sidebarOpen: true,
    }}
  >
    <Story />
  </GlobalServices>
);

const AllTasksGlobalServices = (Story: StoryFn) => (
  <GlobalServices
    context={{
      activeTask: null,
      tasks,
      activeTab: 'today',
      sidebarOpen: true,
    }}
  >
    <Story />
  </GlobalServices>
);

export const OnlyPending: Story = {
  decorators: [DefaultGlobalServices],
};

export const Empty: Story = {
  decorators: [EmptyTasksGlobalServices],
};

export const IncludeCompleted: Story = {
  decorators: [AllTasksGlobalServices],
};
