import { Meta, StoryObj } from '@storybook/react';
import TaskCreator from '@/components/TaskCreator/TaskCreator';
import { appMachine } from '@/actors';
import { interpret } from 'xstate';
import { GlobalStateContext } from '@/components/AppClientSide';

const appService = interpret(appMachine);

appService.start();

appService.send('CREATE_TASK');

const meta: Meta = {
  title: 'Task/Task Creator',
  component: TaskCreator,
  decorators: [
    Story => (
      <GlobalStateContext.Provider value={{ appService }}>
        <Story />
      </GlobalStateContext.Provider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof TaskCreator>;

export const Primary: Story = {
  render: () => <TaskCreator />,
};
