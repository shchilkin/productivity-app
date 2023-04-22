import Input, { InputProps } from './index';
import { StoryFn, Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Common/Input',
  component: Input,
};

export default meta;

const Template: StoryFn<typeof Input> = (args: InputProps) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {};
