'use client'

import React, { useContext } from 'react'
import { useActor } from '@xstate/react'
import { GlobalStateContext } from '@/components/AppClientSide'

const AddNewTaskDialog: React.FunctionComponent = () => {
  const globalServices = useContext(GlobalStateContext)

  const [state] = useActor(globalServices.appService)

  const dialogService = state.children.addNewTaskService

  const [dialogServiceState] = useActor(dialogService)

  const canSave = dialogServiceState.matches('canSave')

  const [newDescription, setNewDescription] = React.useState<string>(
    dialogServiceState.context.description
  )

  return (
    <div
      className={
        'fixed w-screen h-screen bg-gray-800/50 bg-opacity-[50] z-[51]'
      }
    >
      <div
        className={
          'fixed inset-x-0 bottom-0 bg-white/100 flex flex-col justify-center px-[16px] pb-[24px] pt-[16px]'
        }
      >
        <input
          className={'font-semibold text-lg'}
          placeholder={'Task name'}
          onChange={(event) => {
            dialogService.send(
              'UPDATE_LOCAL_CONTEXT',
              // @ts-expect-error TODO: Add types
              {
                title: event.target.value,
              }
            )
          }}
        />
        <input
          className={'text-gray-600'}
          placeholder={'Description'}
          value={newDescription}
          onChange={(event) => {
            setNewDescription(event.target.value)
            dialogService.send(
              'UPDATE_LOCAL_DESCRIPTION',
              // @ts-expect-error TODO: Add types
              {
                description: event.target.value,
              }
            )
          }}
        />
        <section className={'flex w-full flex-row-reverse mt-4'}>
          <button
            disabled={!canSave}
            onClick={() => dialogService.send('SAVE_TASK')}
            className={`grow  ${canSave ? 'bg-amber-300' : 'bg-gray-300'}`}
          >
            Save
          </button>
          <button
            onClick={() => dialogService.send('CANCEL_SAVING')}
            className={'bg-gray-200 grow'}
          >
            Cancel
          </button>
        </section>
      </div>
    </div>
  )
}

export default AddNewTaskDialog
