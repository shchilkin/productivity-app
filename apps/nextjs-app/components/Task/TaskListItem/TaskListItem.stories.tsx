import TaskListItem from '@/components/Task/TaskListItem/index';
import { TaskProps } from '@/components/Task';
import { ComponentStory } from '@storybook/react';

const config = {
  title: 'Task/TaskListItem',
  component: TaskListItem,
};

export default config;

const Template: ComponentStory<typeof TaskListItem> = (args: TaskProps) => <TaskListItem {...args} />;

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
