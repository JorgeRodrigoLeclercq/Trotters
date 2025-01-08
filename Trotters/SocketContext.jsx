import { useState, useEffect, createContext, useContext,  } from 'react';
import { createSocket } from './hooks/socket';

const SocketContext = createContext(null);

export const SocketProvider = ({ children, loggedIn }) => {
  const [socket, setSocket] = useState(null);

  const initializeSocket = async () => {
    if (loggedIn) {
      const socketConnection = await createSocket();
      setSocket(socketConnection);
    } else {
      setSocket(null); // reset socket if logged out
    }
  };

  useEffect(() => {
    initializeSocket();
  }, [loggedIn]); // re-run whenever loggedIn changes

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};