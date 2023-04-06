export interface AuthMachineContext {
  mode: 'register' | 'sign-in' | undefined;
  name: string;
  surname: string;
  password: string;
  email: string;
}
