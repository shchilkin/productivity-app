import { Meta, StoryObj } from '@storybook/react';
import SidebarListItem from '@/components/Sidebar/SidebarListItem/SidebarListItem';

const meta: Meta = {
  title: 'App/Sidebar/SidebarListItem',
  component: SidebarListItem,
};

export default meta;

type Story = StoryObj<typeof SidebarListItem>;

export const Default: Story = {};
