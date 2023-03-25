'use client'
import { SWRConfig } from 'swr'
import React from 'react'
import TaskList from '@/components/TaskList'
import FloatingActionButton from '@/components/FloatingActionButton'
import { Task } from '@prisma/client'

interface AppClientSideProps {
  tasks: Task[]
}

const AppClientSide: React.FunctionComponent<AppClientSideProps> = ({
  tasks,
}) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          '/api/tasks': tasks,
        },
      }}
    >
      <div className={'w-full h-full flex items-top justify-center'}>
        <TaskList />
      </div>
      <FloatingActionButton />
    </SWRConfig>
  )
}

export default AppClientSide
