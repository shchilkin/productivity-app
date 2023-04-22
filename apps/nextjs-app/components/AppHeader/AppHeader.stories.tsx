import { Meta } from '@storybook/react';

import AppHeader from '@/components/AppHeader/index';
import withGlobalServices from '@/.storybook/decorators/withGlobalServices';

const meta: Meta = {
  title: 'App/AppHeader',
  component: AppHeader,
  decorators: [withGlobalServices],
};

export default meta;

const Template = () => <AppHeader />;

export const Default = Template.bind({});
