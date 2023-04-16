'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  router.push('/sign-in');
  return <h1>You will be redirected to sign-in</h1>;
};

export default Page;
