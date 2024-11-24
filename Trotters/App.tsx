import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SignIn, SignUp, Chat, Settings } from './screens';
import BottomTabNavigation from './components/BottomTabNavigation';
import { SocketProvider } from './SocketContext'; // Import SocketProvider

const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const user = await AsyncStorage.getItem('trottersApp');
      setLoggedIn(!!user);
    };

    checkLoginStatus();
  }, []);

  return (
    <SocketProvider loggedIn={loggedIn}>
      <NavigationContainer>
        <Stack.Navigator>
          {loggedIn ? (
            <Stack.Group>
              <Stack.Screen
                name="BottomNavigation"
                component={BottomTabNavigation}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
              <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Group>
          ) : (
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="SignIn" component={SignIn} />
               <Stack.Screen name="SignUp" component={SignUp} />
               <Stack.Screen
                name="BottomNavigation"
                component={BottomTabNavigation}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Chat"
                component={Chat}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SocketProvider>
  );
}