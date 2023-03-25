import UserGreetings from '@/components/UserGreetings'
import React, { Suspense } from 'react'
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

  return (
    <div className={'flex flex-col grow p8 mx-[16px]'}>
      {/*<h1>Productivity App</h1>*/}
      {/*<Suspense fallback={<h1>Loading</h1>}>*/}
      {/*  /!*@ts-expect-error Server Component*!/*/}
      {/*  <UserGreetings />*/}
      {/*</Suspense>*/}
      <AppClientSide tasks={tasks} />
    </div>
  )
}

export default App
