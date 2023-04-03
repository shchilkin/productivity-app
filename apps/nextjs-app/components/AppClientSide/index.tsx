'use client'

import React, { createContext } from 'react'
import TaskList from '@/components/TaskList'
import FloatingActionButton from '@/components/FloatingActionButton'
import { Task } from '@prisma/client'
import { useActor, useInterpret } from '@xstate/react'

import { InterpreterFrom } from 'xstate'
import AddNewTaskDialog from '@/components/AddNewTaskDialog'
import { appMachine } from '@/actors'

interface AppClientSideProps {
  tasks: Task[]
}

export const GlobalStateContext = createContext({
  appService: {} as InterpreterFrom<typeof appMachine>,
})

const AppClientSide: React.FunctionComponent<AppClientSideProps> = ({ tasks }) => {
  const appService = useInterpret(appMachine, {
    context: {
      activeTask: null,
      tasks: tasks,
    },
    devTools: true,
  })

  // inspect({
  //   iframe: false,
  //   url: 'https://stately.ai/viz?inspect',
  // })

  const [state] = useActor(appService)

  const addingNewTask = state.matches('createTask')

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
        {addingNewTask && <AddNewTaskDialog />}
        <FloatingActionButton />
      </GlobalStateContext.Provider>
    </div>
  )
}

export default AppClientSide
