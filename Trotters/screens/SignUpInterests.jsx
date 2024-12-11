import { View, Text, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import styles from "./signUpInterests.style";
import { COLORS } from "../resources";
import Button from "../components/Button";
import interests from "../resources/interests.json";

const SignUpInterests = () => {
    const [interestsList, setInterestsList] = useState(interests.interests);
    const [selectedInterests, setSelectedInterests] = useState({});
    const colors = ['#3B00E6', '#E601D6', '#00E5C3', '#DCE600', '#E67200'];

    const handleInterestPress = (index) => {
        setSelectedInterests(prev => {
            const newSelected = { ...prev };
            if (newSelected[index]) {
                delete newSelected[index];
            } else {
                newSelected[index] = colors[Math.floor(Math.random() * colors.length)];
            }
            return newSelected;
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.placeholderWrapper}>
                <Text style={styles.placeholder}>What do you want to do when travelling?</Text>
            </View>
            
            <View style={styles.scrollViewWrapper}>
                <ScrollView contentContainerStyle={styles.interestsScroll}>
                    <View style={styles.interestsContainer}>
                        {interestsList.map((interest, index) => (
                            <View 
                                key={index} 
                                style={[
                                    styles.interestContainer,
                                    { borderColor: selectedInterests[index] || COLORS.gray }
                                ]}
                                onTouchEnd={() => handleInterestPress(index)}
                            >
                                <View style={[
                                    styles.circle,
                                    { backgroundColor: selectedInterests[index] || COLORS.gray }
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
                    loader={false} 
                    color={COLORS.primary} 
                    colorText={COLORS.white}/>
            </View>
        </View>
    );
}

export default SignUpInterests;
