import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Optional label that describes the input field */
    label?: string;
    /** Optional hint that provides more context */
    hint?: string;
    /** Optional hint that describes the expected value of an input field */
    placeholder?: string;
}

const focusStyles = ['focus:bg-white', 'focus:border', 'focus:border-primary', 'focus:outline-none', 'focus:ring-4', 'focus:ring-primary/30']

const hoverStyles = ['hover:bg-white', 'hover:cursor-pointer', 'hover:border', 'hover:border-neutral', 'hover:outline-none', 'hover:ring-4', 'hover:ring-primary/30']

const defaultStyles = ['rounded-lg', 'bg-neutral', "h-10", 'text-sm', 'pl-3', 'border']

const disabledStyles = ['disabled:opacity-50', 'disabled:cursor-not-allowed', 'disabled:bg-neutral', 'disabled:outline-none', 'disabled:ring-0', 'disabled:border-none']

const invalidStyles = ['invalid:border-red-500', 'invalid:ring-red-500']

const styles = [...focusStyles, ...defaultStyles, ...hoverStyles, ...disabledStyles, ...invalidStyles].join(' ');

const Input: React.FunctionComponent<InputProps> = ({hint, label, ...props}) => {

    if (label || hint) {
        return <div className={'flex flex-col w-full pb-4 gap-1'}>
            {label && <label className={'font-semibold pl-1'} htmlFor={label}>{label}</label>}
            <input className={styles} {...props} />
            {hint && <span className={'text-xs text-gray-500 pl-1'}>{hint}</span>}
        </div>
    }

    return <input className={styles} {...props} />;
};

export default Input;
