import React from 'react'
import { db } from '@/utils/db'
import { getUserFromCookie } from '@/utils/auth'
import { cookies } from 'next/headers'
import AppClientSide from '@/components/AppClientSide'
import { User } from '@prisma/client'

const App = async () => {
  const user = (await getUserFromCookie(cookies())) as User

  const tasks = await db.task.findMany({
    where: {
      ownerId: user.id,
    },
  })

  return <AppClientSide tasks={tasks} />
}

export default App
