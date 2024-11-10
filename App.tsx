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
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SocketProvider>
  );
}

// // /**
// //  * Sample React Native App
// //  * https://github.com/facebook/react-native
// //  *
// //  * @format
// //  */
// import { NavigationContainer } from '@react-navigation/native';
// import BottomTabNavigation from './components/BottomTabNavigation';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// //import { useFonts } from 'expo-font';
// import { useCallback, useEffect, useState } from 'react';
// //import * as SplashScreen from 'expo-splash-screen';
// import { SignIn, SignUp, Chat, Settings } from './screens';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SocketProvider } from './SocketContext'; // Import SocketProvider
// import 'react-native-gesture-handler'; // Make sure this is at the top of the file
// import { enableScreens } from 'react-native-screens';

// enableScreens();
// const Stack = createNativeStackNavigator();

// export default function App() {
//   const [loggedIn, setLoggedIn] = useState(false); // Check login status 

//   // const [fontsLoaded] = useFonts({
//   //   regular: require("./resources/Poppins-Regular.ttf"),
//   //   light: require("./resources/Poppins-Light.ttf"),
//   //   bold: require("./resources/Poppins-Bold.ttf"),
//   //   extrabold: require("./resources/Poppins-ExtraBold.ttf"),
//   //   semibold: require("./resources/Poppins-SemiBold.ttf"),
//   //   medium: require("./resources/Poppins-Medium.ttf"),
//   // });

//   // Retrieve user from local storage
//   // Inside App.tsx
//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       const user = await AsyncStorage.getItem('trottersApp');
//       setLoggedIn(!!user);
//     };

//     const loginListener = () => {
//       checkLoginStatus();
//     };

//     // Listen to login event or trigger manually as needed
//     checkLoginStatus();

//     return () => {
//       // Optional cleanup if you add event listeners for login
//     };
//   }, []);

//   // const onLayoutRootView = useCallback(async () => {
//   //   if (fontsLoaded) {
//   //     await SplashScreen.hideAsync();
//   //   }
//   // }, [fontsLoaded]);

//   // if (!fontsLoaded) {
//   //   return null;
//   // }

//   return (
//     <SocketProvider> 
//       <NavigationContainer>
//         <Stack.Navigator>
//           {loggedIn ? ( // User is logged in
//             <Stack.Group>
//               <Stack.Screen
//                 name="BottomNavigation"
//                 component={BottomTabNavigation}
//                 options={{ headerShown: false }}
//               />
//               <Stack.Screen
//                 name="Chat"
//                 component={Chat}
//                 options={{ headerShown: false }}
//               />
//               <Stack.Screen
//                 name="Settings"
//                 component={Settings}
//                 options={{headerShown: false }}
//                 />
//               <Stack.Screen name="SignIn" component={SignIn} />
//               <Stack.Screen name="SignUp" component={SignUp} />
//             </Stack.Group>
//           ) : ( // User is not logged in; Sign in or Sign up
//             <Stack.Group screenOptions={{ headerShown: false }}>
//               <Stack.Screen name="SignIn" component={SignIn} />
//               <Stack.Screen name="SignUp" component={SignUp} />
//               <Stack.Screen
//                 name="BottomNavigation"
//                 component={BottomTabNavigation}
//                 options={{ headerShown: false }}
//               />
//               <Stack.Screen
//                 name="Chat"
//                 component={Chat}
//                 options={{ headerShown: false }}
//               />
//             </Stack.Group>
//           )}
//         </Stack.Navigator>
//       </NavigationContainer>
//     </SocketProvider>
//   );
// }