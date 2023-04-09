export interface AuthMachineContext {
  mode: 'register' | 'sign-in' | undefined;
  name: string;
  surname: string;
  password: string;
  email: string;
}

export type AuthEvent =
  | { type: 'UPDATE_NAME'; payload: string }
  | { type: 'UPDATE_SURNAME'; payload: string }
  | { type: 'UPDATE_PASSWORD'; payload: string }
  | { type: 'UPDATE_EMAIL'; payload: string }
  | { type: 'AUTHENTICATE' };
