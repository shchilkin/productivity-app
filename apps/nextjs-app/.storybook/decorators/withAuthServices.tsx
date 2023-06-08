import { Decorator } from '@storybook/react';
import React from 'react';
import { AuthContext } from '@/components/AuthContextWrapper';
import { useInterpret } from '@xstate/react';
import authMachine from '@/actors/authMachine/authMachine.machine';

const WithAuthServices =
  (mode: 'register' | 'sign-in'): Decorator =>
  Story => {
    const authService = useInterpret(authMachine, {
      context: {
        mode,
      },
    });
    return (
      <AuthContext.Provider value={{ authService }}>
        <Story />
      </AuthContext.Provider>
    );
  };

// const WithAuthServices: Decorator = (Story) => {
//   const authService = useInterpret(authMachine, {
//     context: {
//       mode: 'register',
//     },
//   });
//   return (
//     <AuthContext.Provider value={{ authService }}>
//       <Story />
//     </AuthContext.Provider>
//   );
// };

export default WithAuthServices;
