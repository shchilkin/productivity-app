import React, { useContext } from 'react';
import { TaskProps } from '@/components/Task';
import { GlobalStateContext } from '@/components/AppClientSide';
import Checkbox from 'components/Task/Checkbox';

/**
 * TaskListItem - Component to display a task in a list
 * @param id - ID of the task
 * @param status - Status of the task
 * @param description - Description of the task
 * @param title - Title of the task
 */
const TaskListItem: React.FunctionComponent<TaskProps> = ({ id, status, description, title }) => {
  const globalServices = useContext(GlobalStateContext);

  const appService = globalServices.appService;

  // const [state] = useActor(appService)

  const { send } = appService;

  return (
    <li className={'py-0.5 w-full flex flex-col'}>
      <div className={'flex flex-row w-full'}>
        <div className={'flex flex-row w-full items-start'}>
          <div className={'flex flex-row items-start w-full gap-3'}>
            <div className={'mt-.5'}>
              <Checkbox checked={status} onChange={() => send('TOGGLE_TASK', { id: id })} />
            </div>
            <div className={'flex flex-col'} onClick={() => send('SELECT_TASK', { id: id })}>
              <h1 className={`text-lg font-semibold grow w-full ${status && 'text-decoration-line: line-through'}`}>
                {title}
              </h1>
              <p className={'text-gray-600'}>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default TaskListItem;
