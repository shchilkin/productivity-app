'use client'

import useTasks from '@/utils/hooks/useTasks'
import React, { useEffect } from 'react'
import idGenerator from '@/utils/idGenerator/idGenerator'
import Task from '@/components/Task'

const localIdGenerator = idGenerator()
const TaskList = () => {
  const { data, isLoading, error } = useTasks()

  const [tasks, setTasks] = React.useState(data)

  useEffect(() => {
    setTasks(data)
  }, [data])

  if (error) return <div>failed to load</div>

  if (isLoading) return <div>loading...</div>

  if (!tasks) return <div>no data</div>

  return (
    <div className={'w-full mt-4'}>
      {tasks
        .map((task) => ({ ...task, localId: localIdGenerator.next().value }))
        .sort((a, b) => a.localId - b.localId)
        .map((task) => (
          <Task key={task.localId} {...task} />
        ))}
    </div>
  )
}

export default TaskList
