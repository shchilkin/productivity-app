'use client'
import { SWRConfig } from 'swr'
import React, { createContext, useEffect } from 'react'
import TaskList from '@/components/TaskList'
import FloatingActionButton from '@/components/FloatingActionButton'
import { Task } from '@prisma/client'
import { useInterpret, useMachine } from '@xstate/react'
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
  const [state] = useMachine(appMachine)

  useEffect(() => {
    console.log(state.value, 'state.value')
  }, [state.value])

  const appService = useInterpret(appMachine)

  return (
    <GlobalStateContext.Provider value={{ appService }}>
      <SWRConfig
        value={{
          fallback: {
            '/api/tasks': tasks,
          },
        }}
      >
        <div className={`flex flex-col grow p8 mx-[16px]`}>
          <div className={'w-full h-full flex items-top justify-center'}>
            <TaskList />
          </div>
        </div>
        <FloatingActionButton />
      </SWRConfig>
    </GlobalStateContext.Provider>
  )
}

export default AppClientSide
