import { AuthMachineContext } from '@/actors/authMachine/authMachine.types';

export const canAuthenticate = (context: AuthMachineContext) => {
  if (context.mode === 'register') {
    return (
      context.name.length > 0 && context.surname.length > 0 && context.email.length > 0 && context.password.length > 0
    );
  }
  if (context.mode === 'sign-in') {
    return context.email.length > 0 && context.password.length > 0;
  }
  return false;
};

export const cannotAuthenticate = (context: AuthMachineContext) => {
  return !canAuthenticate(context);
};
