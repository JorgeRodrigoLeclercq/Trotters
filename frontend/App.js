import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from './components/BottomTabNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { SignIn, SignUp, Chat } from './screens';


const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require("./resources/Poppins-Regular.ttf"),
    light: require("./resources/Poppins-Light.ttf"),
    bold: require("./resources/Poppins-Bold.ttf"),
    extrabold: require("./resources/Poppins-ExtraBold.ttf"),
    semibold: require("./resources/Poppins-SemiBold.ttf"),
    medium: require("./resources/Poppins-Medium.ttf")
  })

  const onLayoutRootView = useCallback(async() => {
    if (fontsLoaded){
      await SplashScreen.hideAsync();
    } 
  }, [fontsLoaded] );

  if (!fontsLoaded){
    return null;
  }

  let isLoggedIn = true;

  return (
    <NavigationContainer>
        <Stack.Navigator>
        {isLoggedIn ? (
          // Screens for logged in users
          <Stack.Group>
            <Stack.Screen
              name='Bottom Navigation'
              component={BottomTabNavigation}
              options={{headerShown:false}}
            />
            <Stack.Screen screenOptions ={{headerShown:false}}
              name='Chat'
              component={Chat}
              options={{headerShown:false}}
            />
          </Stack.Group>
        ) : (
          // Auth screens
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Group>
        )}
        </Stack.Navigator>
    </NavigationContainer>
  );
};