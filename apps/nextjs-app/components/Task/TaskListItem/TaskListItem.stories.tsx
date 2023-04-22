import TaskListItem from '@/components/Task/TaskListItem/index';
import { TaskProps } from '@/components/Task';
import { Meta, StoryFn } from '@storybook/react';

const meta: Meta = {
  title: 'App/Task/TaskListItem',
  component: TaskListItem,
  decorators: [
    (Story: StoryFn) => (
      <div className="border-gray-100 border-2 px-2 py-1 rounded-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;

const Template: StoryFn<typeof TaskListItem> = (args: TaskProps) => <TaskListItem {...args} />;

export const Default = Template.bind({});

Default.args = {
  id: 1,
  status: false,
  description: 'This task is active',
  title: 'Active task',
};

export const Completed = Template.bind({});

Completed.args = {
  id: 1,
  status: true,
  description: 'This item shows up in the completed tab',
  title: 'Completed task',
};
