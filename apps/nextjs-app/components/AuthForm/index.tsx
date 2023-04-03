'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { register, signIn } from '@/utils/api/fetcher'
import Link from 'next/link'

interface AuthFormProps {
  type: 'register' | 'sign-in'
}

interface AuthFormContent {
  title: string
  linkURL: string
  linkText: string
  buttonLabel: string
}

const registerContent: AuthFormContent = {
  title: 'Create new account',
  linkURL: '/sign-in',
  linkText: 'Already have an account?',
  buttonLabel: 'Create account',
}

const signInContent: AuthFormContent = {
  title: 'Welcome back',
  linkURL: '/register',
  linkText: "Don't have an account?",
  buttonLabel: 'sign in',
}

const AuthForm: React.FunctionComponent<AuthFormProps> = ({ type }) => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [disabled, setDisabled] = useState(false)
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('submit')
    try {
      if (type === 'register') {
        setDisabled(true)
        await register({
          email: email,
          password: password,
          name: name,
          surname: surname,
        }).then((response) => {
          console.log(response)
          router.push('/app')
        })
      } else {
        setDisabled(true)
        await signIn({ email: email, password: password }).then((response) => {
          console.log(JSON.stringify(response))
          router.push('/app')
        })
      }
    } catch (error) {
      console.table({
        email: email,
        password: password,
        name: name,
        surname: surname,
      })
      console.error(error)
      setDisabled(false)
    }
  }

  const content = type === 'register' ? registerContent : signInContent

  return (
    <div className={'flex flex-col grow p8 mx-[16px]'}>
      <h2 className={'text-2xl font-bold'}>{content.title}</h2>
      <form onSubmit={handleSubmit}>
        {type === 'register' && (
          <>
            <div className={'flex flex-col w-full pb-4'}>
              <label htmlFor="name">Name</label>
              <input
                className={'border border-gray-300 rounded-md p-2'}
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                }}
              />
            </div>
            <div className={'flex flex-col w-full pb-4'}>
              <label htmlFor="surname">Surname</label>
              <input
                className={'border border-gray-300 rounded-md p-2'}
                type="text"
                name="surname"
                id="surname"
                value={surname}
                onChange={(event) => {
                  setSurname(event.target.value)
                }}
              />
            </div>
          </>
        )}
        <div className={'flex flex-col w-full pb-4'}>
          <label htmlFor="email">Email</label>
          <input
            className={'border border-gray-300 rounded-md p-2'}
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
            }}
          />
        </div>
        <div className={'flex flex-col w-full pb-4'}>
          <label htmlFor="password">Password</label>
          <input
            className={'border border-gray-300 rounded-md p-2'}
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value)
            }}
          />
        </div>
        <button disabled={disabled} className={'px-8 py-2 bg-amber-400 rounded-md mb-4 w-full'} type="submit">
          {content.buttonLabel}
        </button>
      </form>
      <div>
        <span>
          <Link href={content.linkURL} className="text-blue-600 font-bold">
            {content.linkText}
          </Link>
        </span>
      </div>
    </div>
  )
}

export default AuthForm
