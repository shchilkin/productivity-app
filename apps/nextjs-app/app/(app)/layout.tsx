import '@/styles/globals.css';
import React from 'react';

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
    <html>
    <head />
    <body>
    <div className={'h-screen w-screen'}>
      <div className={'w-full h-full flex items-top justify-center'}>
        {children}
      </div>
    </div>
    </body>
    </html>
  );
}