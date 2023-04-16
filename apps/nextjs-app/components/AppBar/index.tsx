'use client';

import React, { useContext } from 'react';
import { HamburgerMenuIcon, PlusIcon, HomeIcon } from '@radix-ui/react-icons';
import { GlobalStateContext } from '@/components/AppClientSide';
import { useActor } from '@xstate/react';

const AppBar: React.FunctionComponent = () => {
  const appService = useContext(GlobalStateContext).appService;

  const [, send] = useActor(appService);
  return (
    <nav className="bg-orange-500 fixed top-0 left-0 right-0 z-50">
      <div className={'flex items-center justify-between px-4 py-3'}>
        <button onClick={() => send('TOGGLE_SIDEBAR')}>
          <HamburgerMenuIcon />
        </button>
        <button disabled={true}>
          <PlusIcon />
        </button>
        <button disabled={true}>
          <HomeIcon />
        </button>
      </div>
    </nav>
  );
};

export default AppBar;
