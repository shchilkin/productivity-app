import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
}

const Button: React.FunctionComponent<ButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {children}
    </button>
  );
};

export default Button;
