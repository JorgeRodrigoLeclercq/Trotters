import { View, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabNavigation from './components/BottomTabNavigation';
import { Chat, SignIn, SignUp, SignUpLocation, SignUpInterests, Settings } from './screens';
import { SocketProvider } from './SocketContext'; 
import { COLORS, SIZES } from './resources';

const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const user = await AsyncStorage.getItem('trottersApp');
      setLoggedIn(!!user);
      setLoading(false); 
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={SIZES.xxLarge}/>
      </View>
    );
  }

  return (
    <SocketProvider loggedIn={loggedIn}>
      <NavigationContainer>
        <Stack.Navigator>
          {loggedIn ? (
            <Stack.Group>
              <Stack.Screen name='BottomNavigation' component={BottomTabNavigation} options={{ headerShown: false }}/>
              <Stack.Screen name='Chat' component={Chat} options={{ headerShown: false }}/>
              <Stack.Screen
                name="Settings"
                options={{ headerShown: false }}
                children={(props) => <Settings {...props} setLoggedIn={setLoggedIn} />}
              />
              <Stack.Screen
                name="SignIn"
                options={{ headerShown: false }}
                children={(props) => <SignIn {...props} setLoggedIn={setLoggedIn} />}
              />
              <Stack.Screen name='SignUp' component={SignUp}/>
              <Stack.Screen name='SignUpLocation' component={SignUpLocation}/>
              <Stack.Screen
                name="SignUpInterests"
                options={{ headerShown: false }}
                children={(props) => <SignUpInterests {...props} setLoggedIn={setLoggedIn} />}
              />
            </Stack.Group>
          ) : (
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="SignIn"
                options={{ headerShown: false }}
                children={(props) => <SignIn {...props} setLoggedIn={setLoggedIn} />}
              />
              <Stack.Screen name='SignUp' component={SignUp}/>
              <Stack.Screen name='SignUpLocation' component={SignUpLocation}/>
              <Stack.Screen
                name="SignUpInterests"
                options={{ headerShown: false }}
                children={(props) => <SignUpInterests {...props} setLoggedIn={setLoggedIn} />}
              />
              <Stack.Screen name='BottomNavigation' component={BottomTabNavigation} options={{ headerShown: false }}/>
              <Stack.Screen name='Chat' component={Chat} options={{ headerShown: false }}/>
              <Stack.Screen
                name="Settings"
                options={{ headerShown: false }}
                children={(props) => <Settings {...props} setLoggedIn={setLoggedIn} />}
              />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SocketProvider>
  );
}