import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from './components/BottomTabNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { SignIn, SignUp, Chat } from './screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SocketProvider } from './SocketContext'; // Import SocketProvider

const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false); // Check login status 

  const [fontsLoaded] = useFonts({
    regular: require("./resources/Poppins-Regular.ttf"),
    light: require("./resources/Poppins-Light.ttf"),
    bold: require("./resources/Poppins-Bold.ttf"),
    extrabold: require("./resources/Poppins-ExtraBold.ttf"),
    semibold: require("./resources/Poppins-SemiBold.ttf"),
    medium: require("./resources/Poppins-Medium.ttf"),
  });

  // Retrieve user from local storage
  useEffect(() => {
    const checkLoginStatus = async () => {
      const user = await AsyncStorage.getItem('testingTrotters1');
      if (user) {
        setLoggedIn(true);
      }
    };
    checkLoginStatus();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SocketProvider> 
      <NavigationContainer>
        <Stack.Navigator>
          {loggedIn ? ( // User is logged in
            <Stack.Group>
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
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
            </Stack.Group>
          ) : ( // User is not logged in; Sign in or Sign up
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
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SocketProvider>
  );
}