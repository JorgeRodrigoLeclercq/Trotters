import { Text, View, Image, Alert } from 'react-native';
import { useState } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles, { GradientBackground } from './signIn.style';
import { COLORS } from '../resources';
import Button from '../components/Button';

GoogleSignin.configure({
    webClientId: '999940019688-2q5ci841jkvgb9us36visi6qk3i72fhg.apps.googleusercontent.com',
    scopes: ['email'],
});

const SignIn = ({ navigation, setIsSignedIn }) => {
    const [isLoading, setIsLoading] = useState(false);

    // Handle the Sign In process
    const signIn = async () => {
        setIsLoading(true);

        try {
            // Choose Google account modals
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();

            if (response) {
                const email = response.data.user.email;
                
                try {
                    const response = await axios.get(`http://192.168.0.22:3000/api/users/signIn/${email}`);
                    
                    if (response.status === 200) { // the user exists
                        // Save user data in the phone and go to Profile screen
                        await AsyncStorage.setItem('trottersApp', JSON.stringify(response.data.userData)); 
                        setIsSignedIn(true);
                        navigation.navigate('BottomNavigation');
                    } else { // the user doesn't exist and therefore they have to create an account
                        navigation.navigate('SignUp', { email: email });
                    }
                } catch (error) {
                    Alert.alert('Error', error.message);
                }
            } 
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                Alert.alert('Sign In Cancelled', 'Sign in was cancelled by the user.');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                Alert.alert('Sign In in Progress', 'Sign in is already in progress.');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('Play Services Unavailable', 'Play services not available or outdated.');
            } else {
                Alert.alert('Error', error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <GradientBackground>
            <View style={styles.container}>
                <View style={styles.logoAndMottoContainer}>
                    <Image
                        source={require('../resources/trotters-logo-white.png')}
                        style={styles.logo}
                    />
                    <Text style={styles.motto}>
                        We are Trotters!
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                <Button
                    title={
                        <View style={{ alignItems: 'center', flexDirection: 'row'}}>
                            <Image
                                source={require('../resources/google.jpg')} 
                                style={{ width: 25, height: 25, marginRight: 10 }}
                            />
                            <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 18, color: COLORS.black }}>
                                Sign In with Google
                            </Text>
                        </View>
                    }
                    onPress={signIn}
                    isLoading={isLoading}
                    color={COLORS.white}
                />
                </View>
            </View>
        </GradientBackground>
    );
};

export default SignIn;