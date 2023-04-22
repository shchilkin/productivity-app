import { Meta, StoryFn } from '@storybook/react';
import AddNewTaskDialog from './index';
import WithGlobalServices from '@/.storybook/decorators/withGlobalServices';

const meta: Meta = {
  title: 'Task/AddNewTaskDialog',
  component: AddNewTaskDialog,
  parameters: {
    xstate: true,
    xstateInspectOptions: {
      url: 'https://stately.ai/viz?inspect',
      serialize: null,
    },
  },
  decorators: [WithGlobalServices],
};

export default meta;

const Template: StoryFn = () => <AddNewTaskDialog />;

export const Default = Template.bind({});
