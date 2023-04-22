import React from 'react';
import Checkbox, {CheckboxProps} from './index';
import {Meta, StoryFn} from '@storybook/react';

const meta: Meta = {
    title: 'Common/Checkbox',
    component: Checkbox,
};

export default meta;

const Template: StoryFn<CheckboxProps> = args => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
    checked: false,
    onChange: () => {
        console.log('changed');
    },
};
