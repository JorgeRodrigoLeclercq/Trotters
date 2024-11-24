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
    webClientId: '999940019688-2q5ci841jkvgb9us36visi6qk3i72fhg.apps.googleusercontent.com',
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
                    const response = await axios.get(`http://192.168.0.20:3000/api/people/login/${email}`);
                    console.log(response);
                    
                    if (response.status === 200) {  // Check if the user exists
                        console.log(response.data);
                        await AsyncStorage.setItem('trottersApp', JSON.stringify(response.data.userData))
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