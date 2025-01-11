import { View, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabNavigation from './components/BottomTabNavigation';
import { Chat, SignIn, SignUp, SignUpLocation, SignUpInterests, Settings } from './screens';
import { COLORS, SIZES } from './resources';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the user is currently signed in from their phone
    const checkSignInStatus = async () => {
      const userData = await AsyncStorage.getItem('trottersApp');
      setIsSignedIn(!!userData);
      setIsLoading(false); 
    };

    checkSignInStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={SIZES.xxLarge}/>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          <Stack.Group>
            <Stack.Screen name='BottomNavigation' component={BottomTabNavigation} options={{ headerShown: false }}/>
            <Stack.Screen name='Chat' component={Chat} options={{ headerShown: false }}/>
            <Stack.Screen
              name='Settings'
              options={{ headerShown: false }}
              children={(props) => <Settings {...props} setIsSignedIn={setIsSignedIn}/>}
            />
            <Stack.Screen
              name='SignIn'
              options={{ headerShown: false }}
              children={(props) => <SignIn {...props} setIsSignedIn={setIsSignedIn}/>}
            />
            <Stack.Screen name='SignUp' component={SignUp}/>
            <Stack.Screen name='SignUpLocation' component={SignUpLocation}/>
            <Stack.Screen
              name='SignUpInterests'
              options={{ headerShown: false }}
              children={(props) => <SignUpInterests {...props} setIsSignedIn={setIsSignedIn}/>}
            />
          </Stack.Group>
        ) : (
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name='SignIn'
              options={{ headerShown: false }}
              children={(props) => <SignIn {...props} setIsSignedIn={setIsSignedIn}/>}
            />
            <Stack.Screen name='SignUp' component={SignUp}/>
            <Stack.Screen name='SignUpLocation' component={SignUpLocation}/>
            <Stack.Screen
              name='SignUpInterests'
              options={{ headerShown: false }}
              children={(props) => <SignUpInterests {...props} setIsSignedIn={setIsSignedIn}/>}
            />
            <Stack.Screen name='BottomNavigation' component={BottomTabNavigation} options={{ headerShown: false }}/>
            <Stack.Screen name='Chat' component={Chat} options={{ headerShown: false }}/>
            <Stack.Screen
              name='Settings'
              options={{ headerShown: false }}
              children={(props) => <Settings {...props} setIsSignedIn={setIsSignedIn} />}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}