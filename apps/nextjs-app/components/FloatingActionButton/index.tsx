'use client';

import React, { useContext } from 'react';
import { GlobalStateContext } from '@/components/AppClientSide';
import { useActor } from '@xstate/react';
import { PlusIcon } from '@radix-ui/react-icons';

const disabledStyles =
  'fixed bottom-4 right-4 bg-gray-400 flex flex-row justify-center items-center gap-1 text-black p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 z-50';
const enabledStyles =
  'fixed bottom-4 right-4 bg-orange-500 flex flex-row justify-center items-center gap-1  text-black p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 z-50';

const FloatingActionButton: React.FunctionComponent = () => {
  const [disabled] = React.useState(false);

  const globalServices = useContext(GlobalStateContext);
  const { send } = globalServices.appService;

  const [state] = useActor(globalServices.appService);

  if (state.matches('editTask')) return null;

  if (state.context.sidebarOpen) return null;

  return (
    <div>
      <button
        disabled={disabled}
        className={disabled ? disabledStyles : enabledStyles}
        onClick={() => {
          send('CREATE_TASK');
        }}
      >
        <PlusIcon /> Add task
      </button>
    </div>
  );
};

export default FloatingActionButton;
