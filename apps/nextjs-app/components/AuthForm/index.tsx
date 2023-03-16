'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/utils/api/fetcher';

const AuthForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log('submit');
    try {
      await signIn({ email: email, password: password }).then((response) => {
        console.log(response);
      });
      router.push('/app');
    } catch (e) {
      console.log(e);
    }
  };

  return <div className={'flex p8'}>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='email'>Email</label>
        <input
        className={'border border-gray-300 rounded-md p-2'}
          type='email' name='email' id='email' value={email} onChange={(event) => {
          setEmail(event.target.value);
        }} />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          className={'border border-gray-300 rounded-md p-2'}
          type='password' name='password' id='password' value={password} onChange={(event) => {
          setPassword(event.target.value);
        }} />
      </div>
      <button className={'px-8 py-2 bg-amber-400 rounded-md'} type='submit'>Submit</button>
    </form>
  </div>
    ;
};

export default AuthForm;