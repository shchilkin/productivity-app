import React, { useContext, useEffect } from 'react';
import { TaskProps } from '@/components/Task';
import { GlobalStateContext } from '@/components/AppClientSide';
import Checkbox from '@/components/common/checkbox';

const TaskPreview: React.FunctionComponent<TaskProps> = ({ title, description, status, id, ownerId }) => {
  const [newTitle, setNewTitle] = React.useState(title);
  const [newDescription, setNewDescription] = React.useState(description ? description : '');

  // TODO: Add edit mode
  const globalServices = useContext(GlobalStateContext);
  const { send } = globalServices.appService;

  const titleInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputRef = titleInputRef.current;
    inputRef?.focus();
    return () => {
      console.log('unmount component with id: ', id);
      inputRef?.blur();
    };
  }, [id]);

  return (
    <div className={'p-4 rounded-md shadow-2xl bg-white'}>
      <div className={'flex flex-row w-full'}>
        <div className={'flex flex-row w-full items-start'}>
          <div className={'flex flex-row items-start w-full gap-3'}>
            <Checkbox checked={status} onChange={() => send('TOGGLE_TASK', { id: id })} />
            <div className={'flex flex-col'}>
              <input
                className={'text-lg font-semibold grow w-full'}
                value={newTitle}
                ref={titleInputRef}
                onChange={event => setNewTitle(event.target.value)}
                autoFocus={true}
              />
              <input
                className={'text-gray-600'}
                value={newDescription}
                onChange={event => setNewDescription(event.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <button className={'bg-amber-500 px-4 py-2'} onClick={() => send('CANCEL')}>
        close
      </button>
      <button className={'bg-red-500 px-4 py-2'} onClick={() => send('DELETE_TASK', { id: id })}>
        Delete
      </button>
      <button
        className={'bg-green-500 px-4 py-2'}
        onClick={() =>
          send('UPDATE_TASK', {
            task: {
              id: id,
              title: newTitle,
              description: newDescription,
              status: status,
              ownerId: ownerId,
            },
          })
        }
      >
        Save
      </button>
    </div>
  );
};

export default TaskPreview;
