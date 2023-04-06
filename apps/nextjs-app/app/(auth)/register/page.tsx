'use client';

import AuthForm from '@/components/AuthForm';
import AuthContextWrapper from '@/components/AuthContextWrapper';

const Register = () => {
  return (
    <AuthContextWrapper type={'register'}>
      <AuthForm />
    </AuthContextWrapper>
  );
};

export default Register;
