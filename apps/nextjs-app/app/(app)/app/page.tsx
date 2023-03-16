import UserGreetings from '@/components/UserGreetings';
import React, { Suspense } from 'react';

const App = async () => {
  return (
    <div>
      <h1>Productivity App</h1>
      <Suspense fallback={<h1>Loading</h1>}>
        {/*@ts-expect-error Server Component*/}
        <UserGreetings />
      </Suspense>
    </div>
  );
};

export default App;