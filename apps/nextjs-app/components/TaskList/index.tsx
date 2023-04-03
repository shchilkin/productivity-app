'use client'

import React, { useContext, useEffect } from 'react'
import idGenerator from '@/utils/idGenerator/idGenerator'
import Task from '@/components/Task'
import { GlobalStateContext } from '@/components/AppClientSide'
import { useActor } from '@xstate/react'

const localIdGenerator = idGenerator()
const TaskList = () => {
  const globalServices = useContext(GlobalStateContext)

  const [state] = useActor(globalServices.appService)

  const [tasks, setTasks] = React.useState(state.context.tasks)

  useEffect(() => {
    setTasks(state.context.tasks)
  }, [state.context.tasks])

  if (!tasks) return <div>no data</div>

  return (
    <ul className={'w-full mt-4'}>
      {tasks
        .map((task) => ({ ...task, localId: localIdGenerator.next().value }))
        .sort((a, b) => {
          return Date.parse(a.createdAt as unknown as string) - Date.parse(b.createdAt as unknown as string)
        })
        .map((task) => (
          <Task key={task.localId} {...task} />
        ))}
    </ul>
  )
}

export default TaskList
