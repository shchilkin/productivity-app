import React from 'react'
import '@/styles/globals.css'

interface AuthRootLayoutProps {
  children: React.ReactNode
}

const AuthRootLayout: React.FunctionComponent<AuthRootLayoutProps> = ({ children }) => {
  return (
    <html lang={'en'}>
      <head />
      <body>
        <div className={'h-screen w-screen'}>
          <div className={'w-full h-full flex items-center justify-center'}>{children}</div>
        </div>
      </body>
    </html>
  )
}

export default AuthRootLayout
