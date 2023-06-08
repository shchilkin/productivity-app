'use client';

import { AuthForm } from 'components';
import AuthContextWrapper from '@/components/AuthContextWrapper';

const Register = () => {
  return (
    <AuthContextWrapper type={'register'}>
      <AuthForm />
    </AuthContextWrapper>
  );
};

export default Register;
