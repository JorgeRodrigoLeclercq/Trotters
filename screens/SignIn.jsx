import React from 'react';
import { Text, View } from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure({
    webClientId: '999940019688-2q5ci841jkvgb9us36visi6qk3i72fhg.apps.googleusercontent.com', // replace with your actual client ID
    //androidClientId: '999940019688-q8ti91kjp1a0oc0bi6oedjt38hut69s3.apps.googleusercontent.com',
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    offlineAccess: true,
    forceCodeForRefreshToken: true,
});

const SignIn = ({ navigation }) => {
    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            if (response) {
                // Handle successful sign-in
                const email =  response.data.user.email;
                try {
                    const response = await axios.get(`http://192.168.0.19:3000/api/people/login/${email}`);
                    console.log(response);
                    
                    if (response.data.exists) {  // Check if the user exists
                        console.log(response.data);
                        await AsyncStorage.setItem('testingTrotters1', JSON.stringify(true));
                        await AsyncStorage.setItem('testingTrotters1info', JSON.stringify(response.data.userData))
                        await AsyncStorage.setItem('testingTrotters1id', JSON.stringify(response.data.userData._id))
                        navigation.reset({
                                              index: 0,
                                              routes: [{ name: 'BottomNavigation' }],
                                            });
                        } else {
                        navigation.navigate("SignUp", { email: email });
                    }
                } catch (error) {
                    console.error("Failed to check user existence", error);
                    // Optionally handle error by showing an alert or some other UI feedback
                }
                
            } else {
                // Sign-in was canceled by user
                console.log('User canceled sign-in');
            }
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('Sign in was cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Sign in is in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play services not available or outdated');
            } else {
                console.log('Some other error occurred:', error);
            }
        }
    };

    return (
        <View>
            <Text>Hello</Text>
            <GoogleSigninButton
                style={{ width: 192, height: 48 }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIn} // Call signIn function on press
            />
        </View>
    );
};

export default SignIn;




// import { View, Text, TouchableOpacity} from "react-native"
// import { COLORS } from "../resources"
// import Ionicons from 'react-native-vector-icons/Ionicons';

// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";
// import { useEffect } from "react";

// const webClientId = "843154932459-lri2dk0fr6e519n0so88r2i69u2dshpc.apps.googleusercontent.com";
// const IOSClientId = "";
// const androidClientId = "843154932459-vm67m673ar1o714ojknug6r573lq3pjj.apps.googleusercontent.com";

// WebBrowser.maybeCompleteAuthSession();

// const SignIn = ({navigation}) => {
//     const config = {
//         webClientId,
//         IOSClientId,
//         androidClientId
//     }

//     const [request, response, promptAsync] = Google.useAuthRequest(config);

//     const handleTocken =  () => {
//         if (response?.type == "success") {
//             const {authentication} = response;
//             const token = authentication?.accessToken;
//             console.log("access token", token);
//         }
//     }

//     useEffect(() => {
//         handleTocken();
//     }, [response]);

//     return(
//         <View style={{flex: 1, textAlign: "center", justifyContent: "center", alignItems: "center"}}>
//             <TouchableOpacity style={{flexDirection: "row", gap: 5, alignItems: "center", backgroundColor: COLORS.primary, padding: 10, borderRadius: 50}} 
//             onPress={() => promptAsync()}>
//                 <Ionicons 
//                     name="logo-google"
//                     size={24}
//                     color={COLORS.white}
//                 />
//                 <Text>Log In with Google</Text>
//             </TouchableOpacity>
//         </View>
//     )
// }

// export default SignIn

// import { View, 
//     Text, 
//     TextInput, 
//     ScrollView, 
//     Image, 
//     TouchableOpacity,
//     Alert } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import styles from "./signIn.style";
// import * as Yup from 'yup';
// import React, { useState, useEffect } from 'react';
// import { MaterialCommunityIcons } from "@expo/vector-icons"
// import { COLORS, SHADOWS, SIZES } from "../resources/index"
// import Button from '../components/Button';
// import { Formik } from 'formik';
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const validationSchema = Yup.object().shape({
//     email: Yup.string()
//         .email("Provide a valid email address")
//         .required("Required"),

//     password: Yup.string()
//         .min(8, "Password must be at least 8 characters")
//         .required("Required")
// });

// const SignIn = ({navigation}) => {

//     const [loader, setLoader] = useState(false);
//     const [responseData, setResponseData] = useState(null);
//     const [obscureText, setObscureText] = useState(false);

//     const invalidForm = () => {
//         Alert.alert(
//             "Invalid Form",
//             "Please provide all required fields",
//             [
//                 {
//                     text: "Cancel", onPress: () => console.log("Error")
//                 },
//                 {
//                     text: "Continue", onPress: () => {}
//                 },
//                 {defaultIndex : 1}
//             ]
//         )
//     }

//     const login = async (values) => {
//         setLoader(true);
//         console.log(values);

//         try {
//             // const endpoint = "http://192.168.1.97:3000/api/people/login";
//             const endpoint = "http://192.168.0.19:3000/api/people/login";
//             const data = values;

//             const response = await axios.post(endpoint, data);

//             if (response.status === 200) {
//                 setLoader(false);
//                 setResponseData(response.data);
//                 console.log(response.data);
//                 await AsyncStorage.setItem('testingTrotters1', JSON.stringify(true));
//                 await AsyncStorage.setItem('testingTrotters1info', JSON.stringify(response.data))
//                 await AsyncStorage.setItem('testingTrotters1id', JSON.stringify(response.data._id))
//                 navigation.reset({
//                   index: 0,
//                   routes: [{ name: 'BottomNavigation' }],
//                 });
//             }



//         // try {
//         //     const endpoint = "http://192.168.1.97:3000/api/people/login";
//         //     const data = values;

//         //     const response = await axios.post(endpoint, data)

//         //     if (response.status === 200){
//         //         setLoader(false);
//         //         setResponseData(response.data);

//         //         // IR A BOTTOM NAVIGATION
//         //         // UTILIZAR RESPONSE DATA EN LAS DIFERENTES PANTALLAS DE BOTTOM NAVIGATION
//         //         // MANTENER LA SESIÓN INICIADA PARA FUTUROS LOGINS
//         //         //await AsyncStorage.setItem('testingTrotters1', true);
//         //         navigation.navigate("Bottom Navigation");
//         //     }
//         else{
//                 Alert.alert(
//                     "Error logging in",
//                     "Please provide valid credentials",
//                     [
//                         {
//                             text: "Cancel", onPress: () => console.log("Error")
//                         },
//                         {
//                             text: "Continue", onPress: () => {}
//                         },
//                         {defaultIndex : 1}
//                     ]
//                 )
//             }
//         } catch (error) {
//             Alert.alert(
//                 "Error logging in",
//                 "Oops",
//                 [
//                     {
//                         text: "Cancel", onPress: () => console.log(error)
//                     },
//                     {
//                         text: "Continue", onPress: () => {}
//                     },
//                     {defaultIndex : 1}
//                 ]
//             )
//             console.log(error);
//         }finally{
//             setLoader(false);
//         }
//     }

//     return(
//         <ScrollView>
//             <SafeAreaView style={{marginHorizontal:20}}>
//                 <View>
//                     <Image
//                     source={require("../resources/pfp.png")}
//                     style={styles.cover}
//                     />

//                     <Text style={styles.title}> LOG IN </Text>
//                     <Formik
//                     initialValues={{email: '', password: ''}}
//                     validationSchema={validationSchema}
//                     onSubmit={(values)=>login(values)}
//                     >
//                     {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched }) => (
//                     <View>
//                         <View
//                             style={styles.wrapper}
//                         >
//                             <Text style={styles.label}>Email</Text>
//                             <View style={styles.inputWrapper(touched.email ? COLORS.primary : COLORS.offwhite)}>
//                                 <MaterialCommunityIcons
//                                     name='email-outline'
//                                     size={20}
//                                     color={COLORS.gray}
//                                     style={styles.iconStyle}
//                                 />
//                                 <TextInput
//                                     placeholder='Enter email'
//                                     onFocus={()=>{setFieldTouched('email')}}
//                                     onBlur={()=>{setFieldTouched('email', '')}}
//                                     value={values.email}
//                                     onChangeText={handleChange('email')}
//                                     autoCapitalize="none"
//                                     autoCorrect={false}
//                                     style={{flex:1}}
//                                 />
//                             </View>
//                             {touched.email && errors.email && (
//                                 <Text style={styles.errorMessage}>{errors.email}</Text>
//                             )}
//                         </View>

//                         <View
//                             style={styles.wrapper}
//                         >
//                             <Text style={styles.label}>Password</Text>
//                             <View style={styles.inputWrapper(touched.password ? COLORS.primary : COLORS.offwhite)}>
//                                 <MaterialCommunityIcons
//                                     name='lock-outline'
//                                     size={20}
//                                     color={COLORS.gray}
//                                     style={styles.iconStyle}
//                                 />
//                                 <TextInput
//                                     secureTextEntry={obscureText}
//                                     placeholder='Enter password'
//                                     onFocus={()=>{setFieldTouched('password')}}
//                                     onBlur={()=>{setFieldTouched('password', '')}}
//                                     value={values.password}
//                                     onChangeText={handleChange('password')}
//                                     autoCapitalize="none"
//                                     autoCorrect={false}
//                                     style={{flex:1}}
//                                 />
//                                 <TouchableOpacity onPress={()=>{setObscureText(!obscureText)}}>
//                                     <MaterialCommunityIcons
//                                     name={obscureText?"eye-outline":"eye-off-outline"}
//                                     size={18}
//                                     />
//                                 </TouchableOpacity>
//                             </View>
//                             {touched.password && errors.password && (
//                                 <Text style={styles.errorMessage}>{errors.password}</Text>
//                             )}
//                         </View>
//                         <Button onPress={isValid?handleSubmit:invalidForm} title="L O G I N" isValid={isValid} loader={loader}/>
//                         <Text style={styles.registration} onPress={()=>{navigation.navigate("SignUp")}}>Register</Text>
//                     </View>
//                     )}

//                     </Formik>
//                 </View>
//             </SafeAreaView>
//         </ScrollView>
//     )
// }

// export default SignIn;