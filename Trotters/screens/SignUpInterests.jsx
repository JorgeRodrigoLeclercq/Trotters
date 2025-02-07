import { View, Text, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './signUpInterests.style';
import { COLORS } from '../resources';
import Button from '../components/Button';
import interests from '../resources/interests.json';

const SignUpInterests = ({ route, navigation, setIsSignedIn }) => {
    const interestsList = interests.interests;
    const [signUpData, setSignUpData] = useState(route.params.data);
    const [selectedInterests, setSelectedInterests] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (Object.keys(selectedInterests).length === 3){ // the user must select 3 interests to create an account
            setSignUpData(prevData => ({
                ...prevData,
                interests: Object.keys(selectedInterests)
            }));
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [selectedInterests])

    const handleInterestPress = (interest) => {
        setSelectedInterests(prev => {
            const newSelected = { ...prev };
            if (newSelected[interest]) { // the user re-selects an interest and therefore it is deleted from the list of selected interests
                delete newSelected[interest];
            } else { // the user selects a new interest
                newSelected[interest] = COLORS.interestsColors[Math.floor(Math.random() * COLORS.interestsColors.length)]; // randomize interest's color
            }
            return newSelected;
        });
    };

    // Handle the Sign Up process
    const signUp = async () => {
        setIsLoading(true);
    
        try {
            // Send new user's data to backend
            const endpoint = 'https://api.wearetrotters.com/users/signUp'; 
            const response = await axios.post(endpoint, signUpData);
            
            if (response.status === 201) {
                const userData = { ...signUpData, _id: response.data._id };

                // Save user data in the phone and go to Profile screen
                await AsyncStorage.setItem('trottersApp', JSON.stringify(userData)); 
                setIsSignedIn(true);
                navigation.navigate('BottomNavigation');
            } else {
                Alert.alert('Error', 'Failed to sign up.');
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong.');
        } finally {
            setIsLoading(false);
        }
    };

    const invalidForm = () => {
        Alert.alert('Invalid form', 'Please select 3 interests.');
    };

    return (
        <View style={styles.container}>
            <View style={styles.placeholderContainer}>
                <Text style={styles.placeholder}>What do you want to do while traveling?</Text>
            </View>
            
            <View style={styles.scrollViewWrapper}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.interestsContainer}>
                        {interestsList.map((interest) => (
                            <View 
                                key={interest} 
                                style={[
                                    styles.interestWrapper,
                                    { borderColor: selectedInterests[interest] || COLORS.gray }
                                ]}
                                onTouchEnd={() => handleInterestPress(interest)}
                            >
                                <View style={[
                                    styles.circle,
                                    { backgroundColor: selectedInterests[interest] || COLORS.gray }
                                ]}/>
                                <Text style={[
                                    styles.interest,
                                    { color: selectedInterests[interest] ? COLORS.black : COLORS.gray }
                                ]}>{interest}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>

            <View style={styles.buttonContainer}>
                <Button 
                    title='Sign Up'
                    onPress={isValid ? 
                        (signUp) 
                        : 
                        (invalidForm)}
                    isValid={isValid} 
                    isLoading={isLoading} 
                    color={COLORS.primary} 
                    textColor={COLORS.white}
                />
            </View>
        </View>
    );
}

export default SignUpInterests;