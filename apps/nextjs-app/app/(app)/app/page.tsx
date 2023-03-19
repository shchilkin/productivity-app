import UserGreetings from '@/components/UserGreetings';
import React, { Suspense } from 'react';
import FloatingActionButton from '@/components/FloatingActionButton';
import TaskList from '@/components/TaskList';

const App = async () => {
  return (
    <div className={'flex flex-col grow p8 mx-[16px]'}>
      <h1>Productivity App</h1>
      <Suspense fallback={<h1>Loading</h1>}>
        {/*@ts-expect-error Server Component*/}
        <UserGreetings />
      </Suspense>
      <div><Suspense fallback={<h1>Loading tasks</h1>}>
        <TaskList />
      </Suspense></div>
      <FloatingActionButton />
    </div>
  );
};

export default App;