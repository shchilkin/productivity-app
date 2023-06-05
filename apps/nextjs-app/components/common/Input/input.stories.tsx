import {Meta, StoryObj} from '@storybook/react';
import Input from './index';
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

export const WithLabel: Story = {
    args: {
        label: 'Label',
        placeholder: 'Input'
    },
    parameters: {
        design: {
            type: 'figma',
            url: "https://www.figma.com/file/9t2wBdb5yapXuJ4TMEFgem/UI-Components?type=design&node-id=12%3A4030&t=usOSI06CU1cJFQ4t-1"
        }
    }
}

export const WithHint: Story = {
    args: {
        placeholder: 'Input',
        hint: 'Hint which provides more context'
    }
}

export const WithLabelAndHint: Story = {
    args: {
        label: 'Label',
        placeholder: 'Input',
        hint: 'Hint'
    }
}

export const Disabled: Story = {
    args: {
        disabled: true,
        placeholder: 'Disabled input'
    }
}