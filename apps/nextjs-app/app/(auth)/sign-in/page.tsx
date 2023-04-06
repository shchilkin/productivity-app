import AuthForm from '@/components/AuthForm';
import AuthContextWrapper from '@/components/AuthContextWrapper';

const SignIn = () => {
  return (
    <AuthContextWrapper type={'sign-in'}>
      <AuthForm />
    </AuthContextWrapper>
  );
};

export default SignIn;
