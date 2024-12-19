import { Text, View, Image, Alert } from 'react-native';
import { useState } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles, { GradientBackground } from './signIn.style';
import { COLORS, SIZES } from '../resources';
import Button from '../components/Button';

GoogleSignin.configure({
    webClientId: '999940019688-2q5ci841jkvgb9us36visi6qk3i72fhg.apps.googleusercontent.com',
    scopes: ['email'],
});

const SignIn = ({ navigation }) => {
    const [isLoading, setIsLoading ] = useState(false);

    const signIn = async () => {
        setIsLoading(true);

        try {
            await GoogleSignin.hasPlayServices();
            setIsLoading(false);
            const response = await GoogleSignin.signIn();

            if (response) {
                const email = response.data.user.email;
                try {
                    const response = await axios.get(`http://192.168.0.22:3000/api/people/signIn/${email}`);

                    if (response.status === 200) {
                        await AsyncStorage.setItem('trottersApp', JSON.stringify(response.data.userData));
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'BottomNavigation' }],
                        });
                    } else {
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
                        <View style={{ alignItems: "center", flexDirection: "row"}}>
                            <Image
                                source={require('../resources/google-icon.png')} 
                                style={{ width: 20, height: 20, marginRight: 10 }}
                            />
                            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: SIZES.medium, color: COLORS.black }}>
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
