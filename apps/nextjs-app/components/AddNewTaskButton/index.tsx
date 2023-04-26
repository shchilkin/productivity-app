import React, { useContext } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import { GlobalStateContext } from '@/components/AppClientSide';

const AddNewTaskButton = () => {
  const globalServices = useContext(GlobalStateContext);
  const { send } = globalServices.appService;
  return (
    <button
      className={'group w-full flex items-center justify-start gap-2 my-2 align-middle'}
      onClick={() => {
        send('CREATE_TASK');
      }}
    >
      <PlusIcon
        width={16}
        height={16}
        className={'rounded-full text-amber-500 group-hover:bg-amber-500 group-hover:text-white'}
      />
      <span className={'group-hover:text-amber-500'}>Add new task</span>
    </button>
  );
};

export default AddNewTaskButton;
