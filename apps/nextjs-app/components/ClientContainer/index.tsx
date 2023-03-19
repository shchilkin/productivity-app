'use client';

import React from 'react';

interface ClientContainerProps {
  children: React.ReactNode;
}

const ClientContainer: React.FunctionComponent<ClientContainerProps> = ({ children }) => {

  return (
    <div>
      {children}
    </div>);
};

export default ClientContainer;