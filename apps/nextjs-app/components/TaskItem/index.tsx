import React, { ChangeEvent, HTMLInputTypeAttribute } from 'react';
import { deleteTask, updateTask } from '@/utils/api/fetcher';
import useTasks from '@/utils/hooks/useTasks';
import { Task } from '@prisma/client';

interface TaskProps {
  id: number;
  title: string;
  description: string | null;
  status: boolean;

}

const findTaskById = (array: Task[], id: number) => {
  return array.find((task) => task.id === id);
};

const TaskItem: React.FunctionComponent<TaskProps> = ({ id, status, description, title }) => {

  const { data, error, isLoading, mutateTasks } = useTasks();

  if (error) return <h1>Error</h1>;
  if (isLoading) return <h1>Loading</h1>;
  if (!data) throw new Error('Data is empty.');

  const taskToFind = findTaskById(data, id);

  // if (!taskToFind) throw new Error('Task id error', id, data);
  if (!taskToFind) return console.error('Task id error', id, data);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    await mutateTasks((data) => {
      if (!data) throw new Error('SWR data error');
      return [...data.filter(item => item.id !== id), { ...taskToFind, status: !taskToFind.status }];
    }, false);

    await updateTask({ id, status, description, title });
  };

  // find item by id in array and return it

  return (
    <div className={'py-0.5 w-full'}>
      <div className={'flex flex-row'}>
        <input type={'checkbox'} checked={status} onChange={handleChange} />
        <h1 className={'ml-1 mr-1'}>{title}</h1>
        <button className={'rounded-md bg-red-500'} onClick={async () => {
          console.log('delete item', id);
          try {
            await mutateTasks((data) => {
              if (!data) throw new Error('SWR data error');
              return data.filter(item => item.id !== id);
            }, false);

            await deleteTask({ id: id });
          } catch (e) {
            console.error(e);
          }
        }}>delete item
        </button>
      </div>
      {/*<h1 className={'ml-4'}>{description}</h1>*/}
    </div>
  );
};

export default TaskItem;
