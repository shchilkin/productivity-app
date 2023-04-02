import AuthForm from '@/components/AuthForm/index'

import { ComponentStory } from '@storybook/react'

// TODO: Implement Next.js Router for Storybook
// this story does not work now in storybook

const config = {
  title: 'AuthForm',
  component: AuthForm,
}
export default config

const Template: ComponentStory<typeof AuthForm> = (args) => (
  <AuthForm {...args} />
)

export const SignIn = Template.bind({})
SignIn.args = {
  type: 'sign-in',
}

export const Register = Template.bind({})
Register.args = {
  type: 'register',
}
