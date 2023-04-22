import { Meta } from '@storybook/react';
import AppBar from '@/components/AppBar/index';
import withGlobalServices from '@/.storybook/decorators/withGlobalServices';

const meta: Meta = {
  title: 'App/AppBar',
  component: AppBar,
  decorators: [withGlobalServices],
};

export default meta;

const Template = () => <AppBar />;

export const Default = Template.bind({});
