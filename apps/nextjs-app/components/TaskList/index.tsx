'use client';

import TaskItem from '@/components/TaskItem';
import useTasks from '@/utils/hooks/useTasks';
import React, { useEffect } from 'react';

const TaskList = () => {

  const { data, isLoading, error } = useTasks();

  const [tasks, setTasks] = React.useState(data);

  useEffect(() => {
    setTasks(data);
  }, [data]);

  if (error) return <div>failed to load</div>;

  if (isLoading) return <div>loading...</div>;

  if (!tasks) return <div>no data</div>;

  return <div className={'grow'}>
    {tasks.map((task, index) => {
      return {
        ...task,
        frontendID: index,
      };
    })
      .sort((a, b) => (a.frontendID - b.frontendID))
      .map((task) => <TaskItem key={task.id} {...task} />)}
  </div>;
};

export default TaskList;