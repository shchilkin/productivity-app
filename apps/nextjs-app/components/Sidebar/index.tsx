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
    <>
      <div
        className={`fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50 transition-opacity sm:hidden ${
          sidebarOpen ? 'opacity-50' : 'opacity-0'
        }`}
      />
      <aside
        className={
          'fixed sm:static top-0 left-0 z-40 max-w-xs w-64 transition-transform-translate-x-full sm:translate-x-0 h-screen'
        }
      >
        <div className={'flex flex-col h-screen items-start px-4 py-2 bg-gray-50 pt-12 sm:pt-4'}>
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
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
