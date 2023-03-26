import React, { useContext } from 'react'
import { TaskProps } from '@/components/Task'
import { GlobalStateContext } from '@/components/AppClientSide'

const TaskPreview: React.FunctionComponent<TaskProps> = ({
  title,
  description,
  status,
  id,
}) => {
  const [newTitle, setNewTitle] = React.useState(title)

  // TODO: Add edit mode
  const globalServices = useContext(GlobalStateContext)
  const { send } = globalServices.appService

  return (
    <div className={'p-4 rounded-md shadow-2xl bg-white'}>
      <div className={'flex flex-row w-full'}>
        <div className={'flex flex-row w-full items-start'}>
          <div className={'flex flex-row items-start w-full gap-3'}>
            <input
              className={'mt-2'}
              type={'checkbox'}
              checked={status}
              onChange={() => send('TOGGLE_ACTIVE_TASK', { id: id })}
              autoFocus
              width={24}
              height={24}
            />
            <div className={'flex flex-col'}>
              <input
                className={'text-lg font-semibold grow w-full'}
                value={newTitle}
                onChange={(event) => setNewTitle(event.target.value)}
                autoFocus={true}
              />
              <h1 className={'text-gray-600'}>{description}</h1>
            </div>
          </div>
        </div>
      </div>
      <button
        className={'bg-amber-500 px-4 py-2'}
        onClick={() => send('CANCEL')}
      >
        close
      </button>
      <button
        className={'bg-red-500 px-4 py-2'}
        onClick={() => send('DELETE_TASK', { id: id })}
      >
        Delete
      </button>
    </div>
  )
}

export default TaskPreview
