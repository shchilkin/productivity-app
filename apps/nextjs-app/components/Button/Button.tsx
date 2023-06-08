import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const Button: React.FunctionComponent<ButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className={styles.primary}>
      {children}
    </button>
  );
};
