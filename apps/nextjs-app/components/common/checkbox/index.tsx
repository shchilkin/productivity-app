import React from 'react';

export interface CheckboxProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

const Checkbox: React.FunctionComponent<CheckboxProps> = ({ onChange, checked }) => {
  return (
    <input
      className={'bg-orange-100 border-orange-300 border-2 text-orange-500 focus:ring-orange-200 h-5 w-5 rounded-full'}
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />
  );
};

export default Checkbox;
