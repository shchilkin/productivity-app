import React, { ChangeEvent } from 'react';
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

  const [editMode, setEditMode] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(title);

  if (error) return <h1>Error</h1>;
  if (isLoading) return <h1>Loading</h1>;

  const taskToFind = findTaskById(data, id);

  if (!taskToFind) {
    console.error('Task id error', id, data);
    return null;
  }

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    await mutateTasks((data) => {
      if (!data) throw new Error('SWR data error');
      return [...data.filter(item => item.id !== id), { ...taskToFind, status: !taskToFind.status }];
    }, false).then(async () => {
        await updateTask({ ...taskToFind, status: !taskToFind.status });
      },
    );
  };

  const handleTitleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setNewTitle(event.target.value);

    await mutateTasks((data) => {
      if (!data) throw new Error('SWR data error');
      return [...data.filter(item => item.id !== id), { ...taskToFind, title: event.target.value }];
    }, false);
  };

  return (
    <div className={'py-0.5 w-full'}>
      <div className={'flex flex-row'}>
        <input type={'checkbox'} checked={status} onChange={handleChange} autoFocus />
        {editMode ? <input value={newTitle} onChange={handleTitleChange} placeholder={'New task'} /> :
          <h1 className={'ml-1 mr-1'}>{title}</h1>}
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
        <button className={`rounded-md ${editMode ? 'bg-green-500' : 'bg-amber-400'}`}
                onClick={async () => {
                  setEditMode(!editMode);
                  await updateTask({ id, status, description, title: newTitle });
                }}>
          {editMode ? 'Apply' : 'Edit item'}
        </button>
      </div>
      {/*<h1 className={'ml-4'}>{description}</h1>*/}
    </div>
  );
};

export default TaskItem;
