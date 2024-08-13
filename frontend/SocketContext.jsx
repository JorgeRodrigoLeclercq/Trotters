import React, { createContext, useContext, useState, useEffect } from 'react';
import { createSocket } from './hook/socket';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const initializeSocket = async () => {
      const socketConnection = await createSocket();
      setSocket(socketConnection);
    };

    initializeSocket();
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
