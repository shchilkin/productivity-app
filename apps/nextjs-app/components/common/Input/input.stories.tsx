import Input from './index';
import {Meta, StoryObj} from '@storybook/react';
import {withDesign} from 'storybook-addon-designs';

const meta: Meta = {
    title: 'Common/Input',
    component: Input,
    decorators: [withDesign],
};

export default meta;

type Story = StoryObj<typeof Input>;


export const Default: Story = {
    args: {
        placeholder: 'Input'
    },
    parameters: {
        design: {
            type: 'figma',
            url: "https://www.figma.com/file/9t2wBdb5yapXuJ4TMEFgem/UI-Components?type=design&node-id=11%3A3986&t=kKmkGdBzgOd2WGL1-1"
        }
    }
}