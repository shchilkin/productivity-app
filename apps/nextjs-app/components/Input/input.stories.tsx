import Input, { InputProps } from './index'
import { ComponentStory } from '@storybook/react'

const config = {
  title: 'Input',
  component: Input,
}

export default config

const Template: ComponentStory<typeof Input> = (args: InputProps) => <Input {...args} />

export const Default = Template.bind({})
Default.args = {}
