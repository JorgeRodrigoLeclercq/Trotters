import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from './components/BottomTabNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';


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
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
          name='Bottom Navigation'
          component={BottomTabNavigation}
          options={{headerShown:false}}
          />
        </Stack.Navigator>
    </NavigationContainer>
  );
};
