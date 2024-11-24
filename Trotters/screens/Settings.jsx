import { Text, View, Image, ScrollView, Alert, ActivityIndicator, TouchableOpacity, StatusBar } from "react-native";
import React from 'react';
import styles from "./settings.style";
import { COLORS, SIZES } from "../resources";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({navigation}) => {

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('trottersApp');
            navigation.reset({
            index: 0,
            routes: [{ name: 'SignIn' }],
            });
        } 

        catch (error) {
            console.log(error);
            Alert.alert("Error", "Something went wrong while logging out.");
        }
    };

    return(
        <View style={styles.container}>
            <View style={{height: StatusBar.currentHeight, backgroundColor: COLORS.white}}></View>
            <View style={styles.header}>
                <Ionicons
                    name="arrow-back"
                    size={26}/>
                <Text style={styles.title}> Settings </Text>
            </View>
            <View>
            <TouchableOpacity style={styles.btnStyle}onPress={handleLogout}>
                <Text style={styles.btnTxt}>LOG OUT</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

export default Settings;