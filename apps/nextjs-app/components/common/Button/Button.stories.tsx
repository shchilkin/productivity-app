import { ComponentStory } from '@storybook/react';
import Button from '@/components/common/Button/index';

const config = {
  title: 'Common/Button',
  component: Button,
};

const Template: ComponentStory<typeof Button> = args => <Button {...args} />;
export const Primary = Template.bind({});
Primary.args = {
  children: 'Primary',
};
export default config;
