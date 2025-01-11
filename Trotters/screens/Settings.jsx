import { View, Text, TouchableOpacity, Alert } from 'react-native';
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
        </View>
    )
}

export default Settings;