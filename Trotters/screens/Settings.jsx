import { View, Text, TouchableOpacity, Alert, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './settings.style';
import { COLORS } from '../resources/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';

const Settings = ({ navigation, setIsSignedIn }) => {
    // Handle the Sign Out process
    const signOut = async () => {
        try {
            // Remove user data in the phone and go to Sign In screen
            await AsyncStorage.removeItem('trottersApp'); 
            setIsSignedIn(false);
            navigation.navigate('SignIn');
        } catch (error) {
            Alert.alert('Error', error);
        }
    };

    // Handle CSAE report email
    const handleEmailPress = () => {
        const email = 'wearetrotters@gmail.com';
        const subject = 'Report CSAE';
        const body = 'Please describe the CSAE issue here...';
        const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        Linking.openURL(url)
            .catch(err => Alert.alert('Error', 'Unable to send email.'));
    };

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('BottomNavigation')}
                    style={styles.backButtonContainer}
                >
                    <Ionicons
                        name='caret-back'
                        size={30}
                        color={COLORS.gray}
                    />
                </TouchableOpacity>
                <Text style={styles.settings}> Settings </Text>
            </View>
            
            <View style={styles.buttonContainer}>
                <Button
                    title='Sign Out' 
                    onPress={signOut}
                    isValid={true}
                    isLoading={false}
                    color={COLORS.primary} 
                    textColor={COLORS.white}
                />
            </View>

            <View style={styles.contactContainer}>
                <TouchableOpacity onPress={handleEmailPress}>
                    <Text style={styles.contactText}>Contact us to report CSAE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Settings;