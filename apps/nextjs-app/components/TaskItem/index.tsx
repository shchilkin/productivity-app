import React, { ChangeEvent } from 'react'
import { updateTask } from '@/utils/api/fetcher'
import useTasks from '@/utils/hooks/useTasks'
import { Task } from '@prisma/client'

export interface TaskProps {
  id: number
  title: string
  description: string | null
  status: boolean
  localId: number
}

const findTaskById = (array: Task[], id: number) => {
  return array.find((task) => task.id === id)
}

const TaskItem: React.FunctionComponent<TaskProps> = ({
  id,
  status,
  description,
  title,
  localId,
}) => {
  const { data, error, isLoading, mutateTasks } = useTasks()

  const [editMode] = React.useState(false)
  const [newTitle, setNewTitle] = React.useState(title)

  console.log('Task local id', localId)

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

  const handleTitleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()

    setNewTitle(event.target.value)

    await mutateTasks((data) => {
      if (!data) throw new Error('SWR data error')
      return [
        ...data.filter((item) => item.id !== id),
        { ...taskToFind, title: event.target.value },
      ]
    }, false)
  }

  return (
    <div className={'py-0.5 w-full flex flex-col'}>
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
              {editMode ? (
                <input
                  value={newTitle}
                  onChange={handleTitleChange}
                  placeholder={'New task'}
                />
              ) : (
                <h1 className={'text-lg font-semibold grow w-full'}>{title}</h1>
              )}
              <h1 className={'text-gray-600'}>{description}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskItem
