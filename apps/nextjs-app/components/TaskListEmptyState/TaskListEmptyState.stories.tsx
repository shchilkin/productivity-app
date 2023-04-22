import { Meta, StoryFn } from '@storybook/react';

import TaskListEmptyState from '@/components/TaskListEmptyState/TaskListEmptyState';

const meta: Meta = {
  title: 'Task/TaskListEmptyState',
  component: TaskListEmptyState,
};

export default meta;

const Template: StoryFn = () => <TaskListEmptyState />;

export const Default = Template.bind({});
