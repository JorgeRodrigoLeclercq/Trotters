import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles, { GradientBackground } from './signIn.style';
import Button from '../components/Button';
import { COLORS } from '../resources';

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
                const email = response.data.user.email;
                try {
                    const apiResponse = await axios.get(`http://192.168.0.22:3000/api/people/signIn/${email}`);
                    console.log(apiResponse);

                    if (apiResponse.status === 200) {
                        console.log(apiResponse.data);
                        await AsyncStorage.setItem('trottersApp', JSON.stringify(apiResponse.data.userData));
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'BottomNavigation' }],
                        });
                    } else {
                        navigation.navigate('SignUp', { email: email });
                    }
                } catch (error) {
                    console.error('Failed to check user existence', error);
                }
            } else {
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
        <GradientBackground>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logo}>
                        Trotters
                    </Text>
                    <Text style={styles.motto}>
                        We are Trotters!
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                <Button
                title={
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                                source={require('../resources/google-icon.png')} 
                                style={{ width: 20, height: 20, marginRight: 10 }}
                            />
                            <Text style={{ color: COLORS.black, fontSize: 16, fontWeight: 'bold' }}>
                                Sign In with Google
                            </Text>
                        </View>
                    }
                    onPress={signIn}
                    loader={false}
                    color={COLORS.white}
                    colorText={COLORS.black}
                    style={{ paddingVertical: 12, paddingHorizontal: 24, borderRadius: 4 }}
                />
                </View>
            </View>
        </GradientBackground>
    );
    
};

export default SignIn;