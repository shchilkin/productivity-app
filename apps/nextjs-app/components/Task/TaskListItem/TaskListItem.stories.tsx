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
  description: 'description',
  title: 'title',
};
