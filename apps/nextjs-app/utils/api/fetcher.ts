import { User } from '@prisma/client';

export const fetcher = async <T>(url: string, method: string, body: T, json = true) => {
  const response = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

  if (json) return await response.json();
};

interface SignInCredentials {
  email: string;
  password: string;
}
export const signIn = (signInCredentials: SignInCredentials) => fetcher<SignInCredentials>('/api/sign-in', 'POST', signInCredentials);

export const register = (user: Omit<User, 'id'>) => fetcher<Omit<User, 'id'>>('/api/register', 'POST', user);