'use client';

import React, { useContext } from 'react';
import { useActor } from '@xstate/react';
import { GlobalStateContext } from '@/components/AppClientSide';

const AddNewTaskDialog: React.FunctionComponent = () => {
  const globalServices = useContext(GlobalStateContext);

  const [state] = useActor(globalServices.appService);

  const addingNewTask = state.matches('createTask');

  console.log(state, 'state');

  const dialogService = state.children.addNewTaskService;

  console.log(dialogService, 'dialogService');

  const [dialogServiceState] = useActor(dialogService);

  const canSave = dialogServiceState && dialogServiceState.matches('canSave');

  if (!addingNewTask) return null;

  return (
    <div className={'fixed w-screen h-screen bg-gray-800/50 bg-opacity-[50] z-[51]'}>
      <div
        className={'fixed inset-x-0 bottom-0 bg-white/100 flex flex-col justify-center px-[16px] pb-[24px] pt-[16px]'}
      >
        <input
          className={'font-semibold text-lg'}
          placeholder={'Task name'}
          onChange={event => {
            // @ts-expect-error TODO: add types
            dialogService.send('UPDATE_LOCAL_CONTEXT', {
              title: event.target.value,
            });
          }}
        />
        <input
          className={'text-gray-600'}
          placeholder={'Description'}
          onChange={event => {
            // @ts-expect-error TODO: add types
            dialogService.send('UPDATE_LOCAL_CONTEXT', {
              description: event.target.value,
            });
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
          <button onClick={() => dialogService.send('CANCEL_SAVING')} className={'bg-gray-200 grow'}>
            Cancel
          </button>
        </section>
      </div>
    </div>
  );
};

export default AddNewTaskDialog;
