import React, { useContext } from 'react'
import TaskPreview from '@/components/Task/TaskPreview'
import TaskListItem from '@/components/Task/TaskListItem'
import { useActor } from '@xstate/react'
import { GlobalStateContext } from '@/components/AppClientSide'
import { InterpreterFrom } from 'xstate'
import { appMachine } from '@/actors'

export interface TaskProps {
  id: number
  title: string
  description: string | null
  status: boolean
  localId: number
  ownerId?: number
  createdAt: Date
  updatedAt: Date
}

const Task: React.FunctionComponent<TaskProps> = ({
  id,
  title,
  description,
  status,
  localId,
  ownerId,
  createdAt,
  updatedAt,
}) => {
  const globalServices = useContext(
    GlobalStateContext as React.Context<{ appService: InterpreterFrom<typeof appMachine> }>
  )

  const appService = globalServices.appService

  const [state] = useActor(appService)

  if (id === state.context.activeTask)
    return (
      <TaskPreview
        {...{
          id,
          title,
          description,
          status,
          localId,
          ownerId,
          createdAt,
          updatedAt,
        }}
      />
    )

  return (
    <TaskListItem
      id={id}
      title={title}
      description={description}
      status={status}
      localId={localId}
      updatedAt={updatedAt}
      createdAt={createdAt}
    />
  )
}

export default Task
