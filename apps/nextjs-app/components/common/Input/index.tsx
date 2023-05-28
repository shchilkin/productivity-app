import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Optional hint that describes the expected value of an input field */
    placeholder?: string;
}

const focusStyles = ['focus:bg-white', 'focus:border', 'focus:border-primary', 'focus:outline-none', 'focus:ring-4', 'focus:ring-primary/30']

const hoverStyles = ['hover:bg-white', 'hover:cursor-pointer', 'hover:border', 'hover:border-neutral', 'hover:outline-none', 'hover:ring-4', 'hover:ring-primary/30']

const defaultStyles = ['rounded-lg', 'bg-neutral', "h-10", 'text-sm', 'pl-3', 'border-0']

const disabledStyles = ['disabled:opacity-50', 'disabled:cursor-not-allowed']

const styles = [...focusStyles, ...defaultStyles, ...hoverStyles, ...disabledStyles].join(' ');

console.log(styles);

const Input: React.FunctionComponent<InputProps> = ({...props}) => {
    return <input className={styles} {...props} />;
};

export default Input;
