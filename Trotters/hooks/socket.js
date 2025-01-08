import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to create and export the socket connection
export const createSocket = async () => {
  try {
    // Retrieve the userID from AsyncStorage
    const data = await AsyncStorage.getItem('trottersApp');
    if (!!data) {
      const parsedData = JSON.parse(data);
      const userId = parsedData._id;
      
      // Pass the userId as a query parameter when establishing the connection
      const socket = io('http://192.168.0.22:3000', {
        query: {
          userId: userId
        }
      });
        
      return socket;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};