import React from 'react';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  placeholder?: string;
}

// const focusStyles = [
//   'focus:bg-white',
//   'focus:border',
//   'focus:border-primary',
//   'focus:outline-none',
//   'focus:ring-4',
//   'focus:ring-primary/30',
// ];
//
// const hoverStyles = [
//   'hover:bg-white',
//   'hover:cursor-pointer',
//   'hover:border',
//   'hover:border-neutral',
//   'hover:outline-none',
//   'hover:ring-4',
//   'hover:ring-primary/30',
// ];
//
// const defaultStyles = ['rounded-lg', 'bg-neutral', 'h-10', 'text-sm', 'pl-3', 'border-0'];
//
// const disabledStyles = ['disabled:opacity-50', 'disabled:cursor-not-allowed'];
//
// const styles = [...focusStyles, ...defaultStyles, ...hoverStyles, ...disabledStyles].join(' ');

export const Input: React.FunctionComponent<InputProps> = ({ hint, label, ...props }) => {
  if (label || hint) {
    return (
      <div className={styles.container}>
        {label && (
          // <label className={'font-semibold pl-1'} htmlFor={label}>
          <label className={styles.label} htmlFor={label}>
            {label}
          </label>
        )}
        <input className={styles.input} {...props} />
        {hint && <span className={styles.helperText}>{hint}</span>}
      </div>
    );
  }
  return <input className={styles.input} {...props} />;
};
