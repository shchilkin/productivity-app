'use client'

import React, { createContext } from 'react'
import TaskList from '@/components/TaskList'
import FloatingActionButton from '@/components/FloatingActionButton'
import { Task } from '@prisma/client'
import { useActor, useInterpret } from '@xstate/react'
import { appMachine } from '@/state'
import { InterpreterFrom } from 'xstate'

interface AppClientSideProps {
  tasks: Task[]
}

export const GlobalStateContext = createContext({
  appService: {} as InterpreterFrom<typeof appMachine>,
})

const AppClientSide: React.FunctionComponent<AppClientSideProps> = ({
  tasks,
}) => {
  const appService = useInterpret(appMachine, {
    context: {
      activeTask: null,
      tasks: tasks,
    },
  })

  const [state] = useActor(appService)

  return (
    <div
      className={`w-full h-full flex items-top justify-center ${
        state.matches('editTask') ? 'bg-gray-200' : 'bg-white'
      }`}
    >
      <GlobalStateContext.Provider value={{ appService }}>
        <div className={`flex flex-col grow p8 mx-[16px]`}>
          <div className={'w-full h-full flex items-top justify-center'}>
            <TaskList />
          </div>
        </div>
        <FloatingActionButton />
      </GlobalStateContext.Provider>
    </div>
  )
}

export default AppClientSide
