'use client';

import React from 'react';
import { InterpreterFrom } from 'xstate';
import authMachine from '@/actors/authMachine/authMachine.machine';
import { useInterpret } from '@xstate/react';

interface AuthContextWrapperProps {
  children: React.ReactNode;
  type: 'register' | 'sign-in';
}

export const AuthContext = React.createContext({
  authService: {} as InterpreterFrom<typeof authMachine>,
});

const AuthContextWrapper: React.FunctionComponent<AuthContextWrapperProps> = ({ children, type }) => {
  const authService = useInterpret(authMachine, {
    context: {
      mode: type,
    },
  });

  return <AuthContext.Provider value={{ authService }}>{children}</AuthContext.Provider>;
};

export default AuthContextWrapper;
