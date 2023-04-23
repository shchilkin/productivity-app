import { Meta, StoryFn, StoryObj } from '@storybook/react';
import Sidebar from '@/components/Sidebar/index';
import withGlobalServices from '@/.storybook/decorators/withGlobalServices';

const meta: Meta = {
  title: 'App/Sidebar',
  component: Sidebar,
  decorators: [withGlobalServices],
};

export default meta;

const Template = () => <Sidebar />;

type Story = StoryObj<typeof Template>;

export const Primary: Story = {
  decorators: [
    (Story: StoryFn) => (
      <div className="max-w-sm border-gray-300 border-2">
        <Story />
      </div>
    ),
  ],
};
