import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSocket } from './hooks/socket';

const SocketContext = createContext(null);

export const SocketProvider = ({ children, loggedIn }) => {
  const [socket, setSocket] = useState(null);

  const initializeSocket = async () => {
    if (loggedIn) {
      const userData = await AsyncStorage.getItem('trottersApp');
      if (userData) {
        const socketConnection = await createSocket();
        setSocket(socketConnection);
      }
    } else {
      setSocket(null); // Reset socket if logged out
    }
  };

  useEffect(() => {
    initializeSocket();
  }, [loggedIn]); // Re-run whenever loggedIn changes

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};