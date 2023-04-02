import TaskPreview from '@/components/Task/TaskPreview/index'

import { TaskProps } from '@/components/Task'
import { ComponentStory } from '@storybook/react'

const config = {
  title: 'Task/TaskPreview',
  component: TaskPreview,
}

export default config

const Template: ComponentStory<typeof TaskPreview> = (args: TaskProps) => (
  <TaskPreview {...args} />
)

export const Default = Template.bind({})

Default.args = {
  id: 1,
  status: false,
  description: 'description',
  title: 'title',
}
