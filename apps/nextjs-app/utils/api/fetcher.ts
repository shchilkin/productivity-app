import { Task, User } from '@prisma/client'

export const fetcher = async <T>(url: string, method: string, body: T | null, json = true) => {
  console.info(body && { body: JSON.stringify(body) })
  const response = await fetch(url, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).catch((error) => {
    throw new Error(error)
  })

  console.log('response', response.ok)

  if (!response.ok) throw new Error(`API Error: ${response.statusText}`)

  if (json) return await response.json()
}

interface SignInCredentials {
  email: string
  password: string
}

export const signIn = (signInCredentials: SignInCredentials) =>
  fetcher<SignInCredentials>('/api/sign-in', 'POST', signInCredentials)

export const register = (user: Omit<User, 'id'>) => fetcher<Omit<User, 'id'>>('/api/register', 'POST', user)

export const createTask = (task: Omit<Task, 'id' | 'ownerId' | 'updatedAt' | 'createdAt'>) =>
  fetcher<Omit<Task, 'id' | 'ownerId' | 'updatedAt' | 'createdAt'>>('/api/task', 'POST', task)

export const updateTask = (task: Omit<Task, 'ownerId' | 'updatedAt' | 'createdAt'>) =>
  fetcher<Omit<Task, 'ownerId' | 'updatedAt' | 'createdAt'>>('/api/task', 'PUT', task)

export const deleteTask = (
  task: Omit<Task, 'id' | 'ownerId' | 'status' | 'description' | 'title' | 'updatedAt' | 'createdAt'>
) =>
  fetcher<Omit<Task, 'id' | 'ownerId' | 'status' | 'description' | 'title' | 'updatedAt' | 'createdAt'>>(
    '/api/task',
    'DELETE',
    task,
    true
  )
