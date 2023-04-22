import { Meta } from '@storybook/react';
import Sidebar from '@/components/Sidebar/index';
import withGlobalServices from '@/.storybook/decorators/withGlobalServices';

const meta: Meta = {
  title: 'App/Sidebar',
  component: Sidebar,
  decorators: [withGlobalServices],
};

export default meta;

const Template = () => <Sidebar />;

export const Default = Template.bind({});
