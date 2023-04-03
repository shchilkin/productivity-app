import React, { useContext } from 'react'
import { TaskProps } from '@/components/Task'
import { GlobalStateContext } from '@/components/AppClientSide'

const TaskListItem: React.FunctionComponent<TaskProps> = ({ id, status, description, title }) => {
  const globalServices = useContext(GlobalStateContext)

  const appService = globalServices.appService

  // const [state] = useActor(appService)

  const { send } = appService

  return (
    <li className={'py-0.5 w-full flex flex-col'}>
      <div className={'flex flex-row w-full'}>
        <div className={'flex flex-row w-full items-start'}>
          <div className={'flex flex-row items-start w-full gap-3'}>
            <input
              className={'mt-2'}
              type={'checkbox'}
              checked={status}
              onChange={() => send('TOGGLE_TASK', { id: id })}
              autoFocus
              width={24}
              height={24}
            />
            <div className={'flex flex-col'} onClick={() => send('SELECT_TASK', { id: id })}>
              <h1 className={'text-lg font-semibold grow w-full'}>{title}</h1>
              <h1 className={'text-gray-600'}>{description}</h1>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default TaskListItem
