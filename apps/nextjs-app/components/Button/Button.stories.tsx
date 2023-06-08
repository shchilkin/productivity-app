import { Meta, StoryObj } from '@storybook/react';
import { Button } from 'components';
import './Button.module.css';

const meta: Meta = {
  title: 'Common/Button',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;
export const Primary: Story = {
  args: {
    children: 'Button',
  },
};
