import React, { ChangeEvent, useRef } from 'react';
import { deleteTask, updateTask } from '@/utils/api/fetcher';
import useTasks from '@/utils/hooks/useTasks';
import { Task } from '@prisma/client';
import { TrashIcon, Pencil1Icon, Cross1Icon } from '@radix-ui/react-icons';

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

  const inputRef = useRef(null);

  console.log(inputRef.current);

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

  const handleTitleOnClick = () => {
    setEditMode(true);

  };

  const EmptyTitleComponent = <h1 onClick={handleTitleOnClick} className={'ml-1 grow mr-1 text-gray-500'}>New task</h1>;

  const TitleComponent = <h1 onClick={handleTitleOnClick}
                             className={`ml-1 mr-1 grow ${status && 'text-gray-500 line-through'}`}>{title}</h1>;


  return (
    <div className={'py-0.5 w-full'}>
      <div className={'flex flex-row justify-between'}>
        <div className={'flex flex-row justify-start items-center'}>
          <input type={'checkbox'} className={'ml-1 mr-1'} checked={status} onChange={handleChange}
          />
          {editMode ? <input autoFocus value={newTitle} onBlur={() => setEditMode(false)} onChange={handleTitleChange}
                             placeholder={'New task'} /> :
            title ? TitleComponent : EmptyTitleComponent}
        </div>
        <div className={'flex flex-row gap-2'}>
          <button className={'rounded-md'} onClick={async () => {
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
          }}>
            <TrashIcon width={24} height={24} />
          </button>
          <button className={`rounded-md`}
                  onClick={async () => {
                    setEditMode(!editMode);
                    await updateTask({ id, status, description, title: newTitle });
                  }}>
            {editMode ? <Cross1Icon width={24} height={24} /> : <Pencil1Icon width={24} height={24} />}
          </button>
        </div>
      </div>
      {/*<h1 className={'ml-4'}>{description}</h1>*/}
    </div>
  );
};

export default TaskItem;
