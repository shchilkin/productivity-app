import React from 'react';

export interface InputProps {
  /** Optional hint that describes the expected value of an input field */
  placeholder?: string;
}

const inputStyles = ['border', 'border-gray-300', 'rounded-md', 'p-2'].join(' ');

const Input: React.FunctionComponent<InputProps> = ({ ...props }) => {
  // convert className to input Styles style
  return <input className={inputStyles} {...props} />;
};

export default Input;
