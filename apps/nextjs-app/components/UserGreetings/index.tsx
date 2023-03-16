import { getUserFromCookie } from '@/utils/auth';
import { cookies } from 'next/headers';
import React from 'react';

const getData = async () => {
  return await getUserFromCookie(cookies());
};
const UserGreetings: () => Promise<JSX.Element> = async () => {

  const user = await getData();

  return (
    <div>
      <h1 className={'text-4xl'}>Hi, {user?.name} 👋</h1>
    </div>);
};

export default UserGreetings;