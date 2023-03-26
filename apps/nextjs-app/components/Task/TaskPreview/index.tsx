import React, { ChangeEvent, useContext } from 'react'
import { TaskProps } from '@/components/Task'
import { updateTask } from '@/utils/api/fetcher'
import useTasks from '@/utils/hooks/useTasks'
import { findTaskById } from '@/components/Task/TaskListItem'
import { GlobalStateContext } from '@/components/AppClientSide'

const TaskPreview: React.FunctionComponent<TaskProps> = ({
  title,
  description,
  status,
  id,
}) => {
  const { data, error, isLoading, mutateTasks } = useTasks()

  const [newTitle, setNewTitle] = React.useState(title)

  // TODO: Add edit mode
  const globalServices = useContext(GlobalStateContext)
  const { send } = globalServices.appService

  if (error) return <h1>Error</h1>
  if (isLoading) return <h1>Loading</h1>

  const taskToFind = findTaskById(data, id)

  if (!taskToFind) {
    console.error('Task id error', id, data)
    return null
  }
  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    await mutateTasks((data) => {
      if (!data) throw new Error('SWR data error')
      return [
        ...data.filter((item) => item.id !== id),
        { ...taskToFind, status: !taskToFind.status },
      ]
    }, false).then(async () => {
      await updateTask({ ...taskToFind, status: !taskToFind.status })
    })
  }

  return (
    <div className={'p-4 rounded-md shadow-2xl'}>
      <div className={'flex flex-row w-full'}>
        <div className={'flex flex-row w-full items-start'}>
          <div className={'flex flex-row items-start w-full gap-3'}>
            <input
              className={'mt-2'}
              type={'checkbox'}
              checked={status}
              onChange={handleChange}
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
      <button className={'bg-red-500 px-4 py-2'} onClick={() => send('CANCEL')}>
        close
      </button>
    </div>
  )
}

export default TaskPreview
