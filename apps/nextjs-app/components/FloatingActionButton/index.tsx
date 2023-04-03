'use client'

import React, { useContext } from 'react'
import { GlobalStateContext } from '@/components/AppClientSide'
import { useActor } from '@xstate/react'
import { appMachine } from '@/actors'
import { InterpreterFrom } from 'xstate'

const disabledStyles =
  'fixed bottom-4 right-4 bg-gray-400 text-black p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 z-50'
const enabledStyles =
  'fixed bottom-4 right-4 bg-gray-300 text-black p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 z-50'

const FloatingActionButton: React.FunctionComponent = () => {
  const [disabled] = React.useState(false)

  const globalServices = useContext(
    GlobalStateContext as React.Context<{
      appService: InterpreterFrom<typeof appMachine>
    }>
  )
  const { send } = globalServices.appService

  const [state] = useActor(globalServices.appService)

  if (state.matches('editTask')) return null

  return (
    <div>
      <button
        disabled={disabled}
        className={disabled ? disabledStyles : enabledStyles}
        onClick={() => {
          send('CREATE_TASK')
        }}
      >
        Add new task
      </button>
    </div>
  )
}

export default FloatingActionButton
