'use client';

import React, { useContext } from 'react';
import { GlobalStateContext } from '@/components/AppClientSide';
import { useActor } from '@xstate/react';

const Sidebar = () => {
  // https://flowbite.com/docs/components/sidebar/

  const appService = useContext(GlobalStateContext).appService;

  const [state, send] = useActor(appService);

  const { sidebarOpen, activeTab } = state.context;

  if (!sidebarOpen) return null;

  return (
    <aside className={'max-w-xs min-w-[240px]'}>
      <ul>
        <li
          className={activeTab === 'inbox' ? 'font-bold' : ''}
          onClick={() =>
            send({
              type: 'SET_ACTIVE_TAB',
              payload: 'inbox',
            })
          }
        >
          Inbox
        </li>
        <li
          className={activeTab === 'today' ? 'font-bold' : ''}
          onClick={() =>
            send({
              type: 'SET_ACTIVE_TAB',
              payload: 'today',
            })
          }
        >
          Today
        </li>
        <li
          className={activeTab === 'completed' ? 'font-bold' : ''}
          onClick={() =>
            send({
              type: 'SET_ACTIVE_TAB',
              payload: 'completed',
            })
          }
        >
          Completed
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
