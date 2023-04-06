import { assign, createMachine } from 'xstate';
import { AuthMachineContext } from '@/actors/authMachine/authMachine.types';
import { canAuthenticate, cannotAuthenticate } from '@/actors/authMachine/authMachine.guards';
import { register, signIn } from '@/utils/api/fetcher';

const authMachine = createMachine<AuthMachineContext>(
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
      UPDATE_AUTH_DATA: {
        actions: 'updateAuthData',
      },
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
      updateAuthData: (context, event) => {
        console.log('updateAuthData', context, event);
        const { payload } = event;

        console.log('payload', payload);
        return {
          ...context,
          ...payload,
        };
      },
      updateName: assign({
        name: (context, event) => {
          return event.payload;
        },
      }),
      updateSurname: assign({
        surname: (context, event) => {
          return event.payload;
        },
      }),
      updatePassword: assign({
        password: (context, event) => {
          return event.payload;
        },
      }),
      updateEmail: assign({
        email: (context, event) => {
          return event.payload;
        },
      }),
    },
  }
);

export default authMachine;
