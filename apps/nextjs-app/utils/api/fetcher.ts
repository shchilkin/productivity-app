import { Task, User } from '@prisma/client';

export const fetcher = async <T>(url: string, method: string, body: T | null, json = true) => {
  console.info((body && { body: JSON.stringify(body) }));
  const response = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).catch((error) => {
    throw new Error(error);
  });

  console.log('response', response.ok);

  if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

  if (json) return await response.json();
};

interface SignInCredentials {
  email: string;
  password: string;
}

export const signIn = (signInCredentials: SignInCredentials) => fetcher<SignInCredentials>('/api/sign-in', 'POST', signInCredentials);

export const register = (user: Omit<User, 'id'>) => fetcher<Omit<User, 'id'>>('/api/register', 'POST', user);

export const getTasks = () => fetcher<Task>('/api/task', 'GET', null, false);

export const createTask = (task: Omit<Task, 'id' | 'ownerId'>) => fetcher<Omit<Task, 'id' | 'ownerId'>>('/api/task', 'POST', task);

export const updateTask = (task: Omit<Task, 'ownerId'>) => fetcher<Omit<Task, 'ownerId'>>('/api/task', 'PUT', task);

export const deleteTask = (task: Omit<Task, 'id' | 'ownerId' | 'status' | 'description' | 'title'>) => fetcher<Omit<Task, 'id' | 'ownerId' | 'status' | 'description' | 'title'>>('/api/task', 'DELETE', task, true);