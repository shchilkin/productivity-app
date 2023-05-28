'use client';

import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useActor } from '@xstate/react';
import { AuthContext } from '@/components/AuthContextWrapper';
import Input from "@/components/common/Input";

interface AuthFormContent {
  title: string;
  linkURL: string;
  linkText: string;
  buttonLabel: string;
}

const variants = {
  open: {
    opacity: 1,
    scale: 1,
  },
  closed: {
    opacity: 0.5,
    scale: 0.98,
  },
};

const registerContent: AuthFormContent = {
  title: 'Create new account',
  linkURL: '/sign-in',
  linkText: 'Already have an account?',
  buttonLabel: 'Create account',
};

const signInContent: AuthFormContent = {
  title: 'Welcome back',
  linkURL: '/register',
  linkText: "Don't have an account?",
  buttonLabel: 'sign in',
};
const AuthForm: React.FunctionComponent = () => {
  const router = useRouter();

  const authService = useContext(AuthContext).authService;

  const [state, send] = useActor(authService);

  const canAuthenticate = state.matches('canAuthenticate');

  const authenticating = state.matches('sendDataToServer');

  useEffect(() => {
    if (state.matches('authSuccess')) {
      router.push('/app');
    }
  }, [router, state]);

  const registerMode = state.context.mode === 'register';

  const content = state.context.mode === 'register' ? registerContent : signInContent;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    send('AUTHENTICATE');
  };

  if (state.matches('authSuccess')) {
    // TODO: Add loading screen
    return (
      <div role="status">
        <svg
          aria-hidden="true"
          className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className={'flex flex-col grow p8 mx-[16px]'}>
      <h2 className={'text-2xl font-bold'}>{content.title}</h2>
      <form onSubmit={handleSubmit}>
        {registerMode && (
          <>
            <div className={'flex flex-col w-full pb-4'}>
              <label htmlFor="name">Name</label>
              <Input
                type="text"
                name="name"
                id="name"
                onChange={event => {
                  send({
                    type: 'UPDATE_NAME',
                    payload: event.target.value,
                  });
                }}
              />
            </div>
            <div className={'flex flex-col w-full pb-4'}>
              <label htmlFor="surname">Surname</label>
              <Input
                type="text"
                name="surname"
                id="surname"
                onChange={event => {
                  send({
                    type: 'UPDATE_SURNAME',
                    payload: event.target.value,
                  });
                }}
              />
            </div>
          </>
        )}
        <div className={'flex flex-col w-full pb-4'}>
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            name="email"
            id="email"
            onChange={event => {
              send({
                type: 'UPDATE_EMAIL',
                payload: event.target.value,
              });
            }}
          />
        </div>
        <div className={'flex flex-col w-full pb-4'}>
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            name="password"
            id="password"
            onChange={event => {
              send({
                type: 'UPDATE_PASSWORD',
                payload: event.target.value,
              });
            }}
          />
        </div>
        <motion.button
          animate={canAuthenticate || authenticating ? 'open' : 'closed'}
          variants={variants}
          disabled={authenticating || !canAuthenticate}
          transition={{ duration: 0.5 }}
          className={`px-8 py-2 rounded-md mb-4 w-full disabled:cursor-not-allowed ${
            authenticating ? 'bg-gray-400 text-black' : 'bg-amber-500 text-black'
          }}`}
          type="submit"
        >
          {authenticating ? 'Loading' : content.buttonLabel}
        </motion.button>
      </form>
      <div>
        <span>
          <Link href={content.linkURL} className="text-blue-600 font-bold">
            {content.linkText}
          </Link>
        </span>
      </div>
    </div>
  );
};

export default AuthForm;
