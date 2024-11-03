// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from './components/BottomTabNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { useFonts } from 'expo-font';
import { useCallback, useEffect, useState } from 'react';
//import * as SplashScreen from 'expo-splash-screen';
import { SignIn, SignUp, Chat, Settings } from './screens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SocketProvider } from './SocketContext'; // Import SocketProvider
import 'react-native-gesture-handler'; // Make sure this is at the top of the file
import { enableScreens } from 'react-native-screens';

enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false); // Check login status 

  // const [fontsLoaded] = useFonts({
  //   regular: require("./resources/Poppins-Regular.ttf"),
  //   light: require("./resources/Poppins-Light.ttf"),
  //   bold: require("./resources/Poppins-Bold.ttf"),
  //   extrabold: require("./resources/Poppins-ExtraBold.ttf"),
  //   semibold: require("./resources/Poppins-SemiBold.ttf"),
  //   medium: require("./resources/Poppins-Medium.ttf"),
  // });

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

  // const onLayoutRootView = useCallback(async () => {
  //   if (fontsLoaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded]);

  // if (!fontsLoaded) {
  //   return null;
  // }

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
              <Stack.Screen
                name="Settings"
                component={Settings}
                options={{headerShown: false }}
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
// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar
//         barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//         backgroundColor={backgroundStyle.backgroundColor}
//       />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
