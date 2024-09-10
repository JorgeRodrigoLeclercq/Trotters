// import { io } from 'socket.io-client';

// export const socket = io('http://192.168.1.97:3000',{
//     query: 
//       "userId= caca"
// });

import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to create and export the socket connection
export const createSocket = async () => {
  try {
    // Retrieve the userID from AsyncStorage
    const userData = await AsyncStorage.getItem('testingTrotters1info');
    const parsedUserData = JSON.parse(userData);
    const userID = parsedUserData._id;
    
    // Check if userID exists
    if (userID !== null) {
      // Pass the userID as a query parameter when establishing the connection
      const socket = io('http://192.168.0.20:3000', {
        query: {
          userId: userID
        }
      });
      
      return socket;
    } else {
      console.error('User ID not found in AsyncStorage');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving userID from AsyncStorage:', error);
    return null;
  }
};
