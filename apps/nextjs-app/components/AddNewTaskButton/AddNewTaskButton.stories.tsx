import { Meta, StoryObj } from '@storybook/react';
import AddNewTaskButton from '@/components/AddNewTaskButton/index';

const meta: Meta = {
  title: 'Task/AddNewTaskButton',
  component: AddNewTaskButton,
};

export default meta;

type Story = StoryObj<typeof AddNewTaskButton>;
export const Primary: Story = {
  render: () => <AddNewTaskButton />,
};
