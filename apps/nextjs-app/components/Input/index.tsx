import React from 'react'

export interface InputProps {
  props: React.InputHTMLAttributes<HTMLInputElement>
}

const Input: React.FunctionComponent<InputProps> = ({ ...props }) => {
  return (
    <input className={'border border-gray-300 rounded-md p-2'} {...props} />
  )
}

export default Input
