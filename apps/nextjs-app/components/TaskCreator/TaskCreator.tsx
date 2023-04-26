import React, { useContext } from 'react';
import { useActor } from '@xstate/react';
import { GlobalStateContext } from '@/components/AppClientSide';

const saveButtonStyles = ['bg-orange-500', 'text-white', 'px-3', 'py-1.5', 'rounded-md', 'text-sm'].join(' ');
const saveButtonDisabledStyles = [
  'bg-orange-500/50',
  'text-black/50',
  'px-3',
  'py-1.5',
  'rounded-md',
  'text-sm',
  'cursor-not-allowed',
].join(' ');

const TaskCreator: React.FunctionComponent = () => {
  const globalServices = useContext(GlobalStateContext);
  const [globalState] = useActor(globalServices.appService);
  const dialogService = globalState.children.addNewTask;
  const [state, send] = useActor(dialogService);

  console.log(state.context, 'state context');

  return (
    <div className={'border border-gray-300 rounded-lg flex mt-2 flex-col px-2 py-2'}>
      <input
        placeholder={'Task name'}
        className={'border-0 font-semibold px-1 pb-1 outline-0 focus:outline-0 focus:ring-offset-0 resize-none'}
        onChange={event => send({ type: 'UPDATE_LOCAL_CONTEXT', title: event.target.value })}
      />
      <textarea
        className={'border-0 text-sm px-1 py-0 focus:ring-0 focus:ring-offset-0 resize-none text-gray-600'}
        placeholder={'Task description'}
        rows={1}
        cols={25}
        onChange={event => send({ type: 'UPDATE_LOCAL_CONTEXT', description: event.target.value })}
      />
      <div className={'flex flex-row justify-end gap-2 mt-1'}>
        <button className={'bg-gray-200 px-3 py-1.5 rounded-md text-sm'} onClick={() => send('CANCEL_SAVING')}>
          Cancel
        </button>
        <button
          disabled={state.matches('cannotSave')}
          className={state.matches('canSave') ? saveButtonStyles : saveButtonDisabledStyles}
          onClick={() => send('SAVE_TASK')}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskCreator;
