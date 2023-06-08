import { AuthForm } from 'components';
import { Meta, StoryObj } from '@storybook/react';
import WithAuthServices from '@/.storybook/decorators/withAuthServices';

const meta: Meta = {
  title: 'Auth/AuthForm',
  component: AuthForm,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: { exclude: ['type'] },
  },
};
export default meta;

type Story = StoryObj<typeof AuthForm>;

export const SignIn: Story = {
  decorators: [WithAuthServices('sign-in')],
  args: {
    type: 'sign-in',
  },
};

export const Register: Story = {
  decorators: [WithAuthServices('register')],
  args: {
    type: 'register',
  },
};
