'use client';

import React, { createContext } from 'react';
import TaskList from '@/components/TaskList';
import FloatingActionButton from '@/components/FloatingActionButton';
import { Task } from '@prisma/client';
import { useActor, useInterpret } from '@xstate/react';
import { InterpreterFrom } from 'xstate';
import AddNewTaskDialog from '@/components/AddNewTaskDialog';
import { appMachine } from '@/actors';
import AppHeader from '@/components/AppHeader';
import { SnackbarProvider } from 'notistack';
import Sidebar from '@/components/Sidebar';
import AppBar from '@/components/AppBar';

interface AppClientSideProps {
  tasks: Task[];
}

export const GlobalStateContext = createContext({
  appService: {} as InterpreterFrom<typeof appMachine>,
});

const AppClientSide: React.FunctionComponent<AppClientSideProps> = ({ tasks }) => {
  const appService = useInterpret(appMachine, {
    context: {
      activeTask: null,
      tasks: tasks,
      activeTab: 'inbox',
    },
    devTools: true,
  });

  const [state] = useActor(appService);

  const isSidebarOpen = state.context.sidebarOpen;

  return (
    <GlobalStateContext.Provider value={{ appService }}>
      <SnackbarProvider autoHideDuration={3000}>
        <AppBar />
        <div
          className={`w-full h-full mt-[39px] flex items-top justify-center ${
            state.matches('editTask') ? 'bg-gray-200' : 'bg-white'
          }`}
        >
          <div className={`flex flex-row grow ${isSidebarOpen ? 'mr-[16px]' : ' mx-[16px]'}`}>
            <Sidebar />
            <main className={`flex flex-col w-full grow min-w-[240px] ${isSidebarOpen ? 'ml-4' : ''}`}>
              <AppHeader />
              <div className={'w-full h-full flex items-top justify-center'}>
                <TaskList />
              </div>
            </main>
          </div>
          {state.matches('createTask') && <AddNewTaskDialog />}
          <FloatingActionButton />
        </div>
      </SnackbarProvider>
    </GlobalStateContext.Provider>
  );
};

export default AppClientSide;
