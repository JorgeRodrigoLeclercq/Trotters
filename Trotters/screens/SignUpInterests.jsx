import { View, Text, ScrollView, Alert } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./signUpInterests.style";
import { COLORS } from "../resources";
import Button from "../components/Button";
import interests from "../resources/interests.json";

const SignUpInterests = ({ route, navigation }) => {
    const interestsList = interests.interests;
    const [signUpData, setSignUpData] = useState(route.params.data);
    const [selectedInterests, setSelectedInterests] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const colors = ['#3B00E6', '#E601D6', '#00E5C3', '#DCE600', '#E67200'];

    useEffect(() => {
        if (Object.keys(selectedInterests).length === 3){
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
            if (newSelected[interest]) {
                delete newSelected[interest];
            } else {
                newSelected[interest] = colors[Math.floor(Math.random() * colors.length)];
            }
            return newSelected;
        });
    };

    const signUp = async () => {
        setIsLoading(true);
    
        try {
            const endpoint = "http://192.168.0.22:3000/api/people/signUp";
            const response = await axios.post(endpoint, signUpData);
    
            if (response.status === 201) {
                setSignUpData(prevData => ({
                    ...prevData,
                    _id: response._id
                }));
                await AsyncStorage.setItem('trottersApp', JSON.stringify(signUpData));
                navigation.navigate('BottomNavigation');
            } else {
                Alert.alert("Error", "Failed to sign up");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.placeholderWrapper}>
                <Text style={styles.placeholder}>What do you want to do while travelling?</Text>
            </View>
            
            <View style={styles.scrollViewWrapper}>
                <ScrollView contentContainerStyle={styles.interestsScroll}>
                    <View style={styles.interestsContainer}>
                        {interestsList.map((interest) => (
                            <View 
                                key={interest} 
                                style={[
                                    styles.interestContainer,
                                    { borderColor: selectedInterests[interest] || COLORS.gray }
                                ]}
                                onTouchEnd={() => handleInterestPress(interest)}
                            >
                                <View style={[
                                    styles.circle,
                                    { backgroundColor: selectedInterests[interest] || COLORS.gray }
                                ]}/>
                                <Text style={styles.interest}>{interest}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </View>

            <View style={styles.button}>
                <Button 
                    title="Sign Up"
                    onPress={signUp}
                    isValid={isValid} 
                    isLoading={isLoading} 
                    color={COLORS.primary} 
                    textColor={COLORS.white}/>
            </View>
        </View>
    );
}

export default SignUpInterests;