import React, { useContext } from 'react';
import { PlusIcon } from '@radix-ui/react-icons';
import { GlobalStateContext } from '@/components/AppClientSide';
// import {useActor} from "@xstate/react";

const AddNewTaskButton = () => {
  const globalServices = useContext(GlobalStateContext);
  const { send } = globalServices.appService;

  // const [state] = useActor(globalServices.appService);

  return (
    <button
      className={'w-full flex items-center justify-center gap-2 align-middle'}
      onClick={() => {
        send('CREATE_TASK');
      }}
    >
      <PlusIcon width={16} height={16} /> add new task
    </button>
  );
};

export default AddNewTaskButton;
