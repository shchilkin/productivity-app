import React, { useContext } from 'react';
import { useActor } from '@xstate/react';
import { GlobalStateContext } from '@/components/AppClientSide';

// types
// inbox - all uncompleted tasks
// today - all tasks due today
// upcoming - all tasks due in the next 7 days
// completed - all completed tasks

const AppHeader: React.FunctionComponent = () => {
  const appService = useContext(GlobalStateContext).appService;

  const [state] = useActor(appService);

  const { activeTab } = state.context;

  return <h2 className={'text-2xl font-bold mt-[12px]'}>{activeTab}</h2>;
};

export default AppHeader;
