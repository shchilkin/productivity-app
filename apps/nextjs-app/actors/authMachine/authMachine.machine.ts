import { assign, createMachine } from 'xstate';
import { AuthEvent, AuthMachineContext } from '@/actors/authMachine/authMachine.types';
import { canAuthenticate, cannotAuthenticate } from '@/actors/authMachine/authMachine.guards';
import { register, signIn } from '@/utils/api/fetcher';

const authMachine = createMachine<AuthMachineContext, AuthEvent>(
  {
    id: 'authMachine',
    predictableActionArguments: true,
    initial: 'cannotAuthenticate',
    context: {
      mode: undefined,
      name: '',
      surname: '',
      password: '',
      email: '',
    },
    states: {
      cannotAuthenticate: {
        always: {
          cond: 'canAuthenticate',
          target: 'canAuthenticate',
        },
      },
      canAuthenticate: {
        always: {
          cond: 'cannotAuthenticate',
          target: 'cannotAuthenticate',
        },
        on: {
          AUTHENTICATE: {
            target: 'sendDataToServer',
          },
        },
      },
      sendDataToServer: {
        invoke: {
          id: 'authService',
          src: (context: AuthMachineContext) => {
            if (context.mode === 'register') {
              return register({
                name: context.name,
                surname: context.surname,
                email: context.email,
                password: context.password,
              });
            }
            if (context.mode === 'sign-in') {
              return signIn({
                email: context.email,
                password: context.password,
              });
            }
            console.log('attempting to authenticate');
            return new Promise(resolve => {
              setTimeout(() => {
                resolve(context);
              }, 10000);
            });
          },
          onDone: {
            target: 'authSuccess',
          },
          onError: {
            target: 'cannotAuthenticate',
            actions: (context, event) => console.log('cannot authenticate', context, event),
          },
        },
      },
      authSuccess: {
        type: 'final',
      },
    },
    on: {
      UPDATE_NAME: {
        actions: 'updateName',
      },
      UPDATE_SURNAME: {
        actions: 'updateSurname',
      },
      UPDATE_PASSWORD: {
        actions: 'updatePassword',
      },
      UPDATE_EMAIL: {
        actions: 'updateEmail',
      },
    },
  },
  {
    guards: {
      canAuthenticate,
      cannotAuthenticate,
    },
    actions: {
      updateName: assign({
        name: (context, event) => {
          if (event.type !== 'UPDATE_NAME') {
            return context.name;
          }
          return event.payload;
        },
      }),
      updateSurname: assign({
        surname: (context, event) => {
          if (event.type !== 'UPDATE_SURNAME') {
            return context.surname;
          }
          return event.payload;
        },
      }),
      updatePassword: assign({
        password: (context, event) => {
          if (event.type !== 'UPDATE_PASSWORD') {
            return context.password;
          }
          return event.payload;
        },
      }),
      updateEmail: assign({
        email: (context, event) => {
          if (event.type !== 'UPDATE_EMAIL') {
            return context.email;
          }
          return event.payload;
        },
      }),
    },
  }
);

export default authMachine;
