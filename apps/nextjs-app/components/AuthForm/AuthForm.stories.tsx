import AuthForm from '@/components/AuthForm/index';

import { Meta, StoryFn } from '@storybook/react';
import WithAuthServices from '@/.storybook/decorators/withAuthServices';

// TODO: Implement Next.js Router for Storybook
// this story does not work now in storybook

const meta: Meta = {
  title: 'Auth/AuthForm',
  component: AuthForm,
  decorators: [WithAuthServices],
};
export default meta;

const Template: StoryFn<typeof AuthForm> = args => <AuthForm {...args} />;

export const SignIn = Template.bind({});
SignIn.args = {
  type: 'sign-in',
};

export const Register = Template.bind({});
Register.args = {
  type: 'register',
};
