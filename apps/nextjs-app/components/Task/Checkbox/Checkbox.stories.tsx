import React from 'react';
import Checkbox, { CheckboxProps } from './index';
import { Meta, StoryFn } from '@storybook/react';

const meta: Meta = {
  title: 'App/Task/Checkbox',
  component: Checkbox,
};

export default meta;

const Template: StoryFn<CheckboxProps> = args => <Checkbox {...args} />;

export const Unchecked = Template.bind({});
Unchecked.args = {
  checked: false,
  onChange: () => {
    console.log('changed');
  },
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
  onChange: () => {
    console.log('changed');
  },
};
