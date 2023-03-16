import React from 'react';
import '@/styles/globals.css';

interface AuthRootLayoutProps {
  children: React.ReactNode;
}

const AuthRootLayout: React.FunctionComponent<AuthRootLayoutProps> = ({ children }) => {
  return (
    <html lang={'en'}>
    <head />
    <body>
    <div className={'h-screen w-screen flex items-center'}>
      {children}
    </div>
    </body>
    </html>
  );
};

export default AuthRootLayout;