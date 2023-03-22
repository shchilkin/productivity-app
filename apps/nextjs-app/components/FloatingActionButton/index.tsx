'use client';

import React from 'react';
import { createTask } from '@/utils/api/fetcher';
import useTasks from '@/utils/hooks/useTasks';
import { v4 } from 'uuid';
import { Task } from '@prisma/client';

const disabledStyles = 'fixed bottom-4 right-4 bg-gray-400 text-black p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 z-50';
const enabledStyles = 'fixed bottom-4 right-4 bg-amber-400 text-black p-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 z-50';

const FloatingActionButton: React.FunctionComponent = () => {
  const [disabled, setDisabled] = React.useState(false);

  const { data, mutateTasks } = useTasks();
  const handleClick = async () => {
    // setDisabled(true);

    const id = v4();
    const newTask = {
      title: '', description: '', status: false, id,
    };

    await mutateTasks(data => {
      // @ts-expect-error
      return [...data, newTask];
    }, false);

    const response = await createTask(newTask).then((data) => {
      return data;
    });

    await mutateTasks((data) => {
      if (!data) throw new Error('SWR data error');
      return data.map((task) => {
          if (typeof task.id === 'string') {
            return response;
          }
          return task;
        },
      );
    }, false);
  };

  return (
    <div>
      <button
        disabled={disabled}
        className={disabled ? disabledStyles : enabledStyles}
        onClick={handleClick}
      >
        create new task
      </button>
    </div>
  );
};

export default FloatingActionButton;
