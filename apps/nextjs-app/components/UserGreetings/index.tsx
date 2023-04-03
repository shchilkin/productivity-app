import { getUserFromCookie } from '@/utils/auth'
import { cookies } from 'next/headers'
import React from 'react'
import { User } from '@prisma/client'

const getData = async () => {
  return (await getUserFromCookie(cookies())) as User
}

/** @deprecated - test component - remove when I have free time */
const UserGreetings: () => Promise<JSX.Element> = async () => {
  const user = await getData()

  return (
    <div>
      <h1 className={'text-4xl'}>Hi, {user?.name} 👋</h1>
    </div>
  )
}

export default UserGreetings
