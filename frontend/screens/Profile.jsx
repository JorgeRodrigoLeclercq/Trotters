

import { Text, View, Image, ScrollView, Alert, ActivityIndicator } from "react-native";
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "./profile.style";
import { Dimensions } from 'react-native';
import { StatusBar } from "react-native";
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { COLORS } from "../resources";

const Profile = ({navigation}) => {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {

    try {
      const info = await AsyncStorage.getItem('testingTrotters1info');
        const parsedInfo = JSON.parse(info);
        setUserData(parsedInfo);
        setLoading(false);
        console.log(userData);

      } catch (error) {
        console.error(error);
        setLoading(false);
        Alert.alert("Error", "Something went wrong while fetching user data.");
      }
    };

      getUserData();
    }, []);

    const handleLogout = async () => {

      try {
        await AsyncStorage.removeItem('testingTrotters1');
        await AsyncStorage.removeItem('testingTrotters1info')
        await AsyncStorage.removeItem('testingTrotters1id')
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

    if (loading) {
      return (
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={{height: StatusBar.currentHeight, backgroundColor: COLORS.primary}}></View>
        
        <View style={styles.top}>
          <Text style={styles.logo}> TROTTERS </Text>
        </View>

        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.user}>
          <Image style={styles.pfp} source={require('../resources/pfp.png')}/>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.nationality}>{userData.nationality}</Text>
        </View>

        <View style={styles.attribute}>
            <Text style={styles.tag}>Age</Text>
            <View style={styles.line}></View>
            <Text style={styles.info}>{userData.age}</Text>
        </View>

        <View style={styles.attribute}>
          <Text style={styles.tag}>Interests</Text>
          <View style={styles.line}></View>
          <Text style={styles.info}>{userData.interests}</Text>
        </View>

        <View style={styles.attribute}>
          <Text style={styles.tag}>About Me</Text>
          <View style={styles.line}></View>
          <Text style={styles.info}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas</Text>
        </View>
        </ScrollView>
      </View>
    )
}

export default Profile;



