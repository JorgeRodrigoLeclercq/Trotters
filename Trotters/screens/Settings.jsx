import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './settings.style';
import { COLORS } from '../resources/constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';

const Settings = ({navigation}) => {
    const signOut = async () => {
        try {
            await AsyncStorage.removeItem('trottersApp');
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
                    style={styles.backWrapper}>
                    <Ionicons
                        name='caret-back'
                        size={30}
                        color={COLORS.gray}
                    />
                </TouchableOpacity>
                <Text style={styles.title}> Settings </Text>
            </View>
            <View style={styles.button}>
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