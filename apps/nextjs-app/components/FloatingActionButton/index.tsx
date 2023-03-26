'use client'

import React, { useContext } from 'react'
import { GlobalStateContext } from '@/components/AppClientSide'

const disabledStyles =
  'fixed bottom-4 right-4 bg-gray-400 text-black p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 z-50'
const enabledStyles =
  'fixed bottom-4 right-4 bg-gray-300 text-black p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 z-50'

const FloatingActionButton: React.FunctionComponent = () => {
  const [disabled] = React.useState(false)

  // CREATE_TASK
  const globalServices = useContext(GlobalStateContext)
  const { send } = globalServices.appService

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
