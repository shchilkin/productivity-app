import React, { useContext } from 'react'
import TaskPreview from '@/components/Task/TaskPreview'
import TaskListItem from '@/components/Task/TaskListItem'
import { useActor } from '@xstate/react'
import { GlobalStateContext } from '@/components/AppClientSide'

export interface TaskProps {
  id: number
  title: string
  description: string | null
  status: boolean
  localId: number
}

const Task: React.FunctionComponent<TaskProps> = ({
  id,
  title,
  description,
  status,
  localId,
}) => {
  const globalServices = useContext(GlobalStateContext)

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
    />
  )
}

export default Task
