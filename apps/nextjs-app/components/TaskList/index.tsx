'use client';

import React, { useContext, useEffect } from 'react';
import idGenerator from '@/utils/idGenerator/idGenerator';
import Task from '@/components/Task';
import { GlobalStateContext } from '@/components/AppClientSide';
import { useActor } from '@xstate/react';
import TaskListEmptyState from '@/components/TaskListEmptyState/TaskListEmptyState';

const localIdGenerator = idGenerator();
const TaskList = () => {
  const globalServices = useContext(GlobalStateContext);

  // TODO: Add filters

  const [state] = useActor(globalServices.appService);

  const activeTab = state.context.activeTab;

  const [tasks, setTasks] = React.useState(state.context.tasks);

  console.log('tasks', tasks);

  console.log('activeTab', activeTab);

  useEffect(() => {
    setTasks(state.context.tasks);
  }, [state.context.tasks]);

  if (!tasks) return <div>no data</div>;

  if (tasks.length === 0) return <TaskListEmptyState />;

  return (
    <ul className={'w-full mt-4'}>
      {tasks
        //   TODO: remove local id
        .map(task => ({ ...task, localId: localIdGenerator.next().value }))
        .filter(task => {
          if (activeTab === 'inbox') {
            return task.status === false;
          }
          if (activeTab === 'today') {
            // TODO: add today filter
            return task;
          }
          if (activeTab === 'completed') {
            return task.status === true;
          }
        })
        .sort((a, b) => {
          return Date.parse(a.createdAt as unknown as string) - Date.parse(b.createdAt as unknown as string);
        })
        .map(task => (
          <Task key={task.localId} {...task} />
        ))}
    </ul>
  );
};

export default TaskList;
