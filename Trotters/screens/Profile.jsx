import { Text, View, Image, ScrollView, Alert, ActivityIndicator, TouchableOpacity } from "react-native";
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "./profile.style";
import { Dimensions } from 'react-native';
import { StatusBar } from "react-native";
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { COLORS } from "../resources";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Profile = ({navigation}) => {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const info = await AsyncStorage.getItem('trottersApp');
        const parsedInfo = JSON.parse(info);
        setUserData(parsedInfo);
        setLoading(false);
        console.log(parsedInfo);  // Log parsed user data
      } catch (error) {
        console.error(error);
        setLoading(false);
        Alert.alert("Error", "Something went wrong while fetching user data.");
      }
    };

    getUserData();
  }, []);

  const getRandomColor = () => {
    const colorList = ['#3B00E6', '#E601D6', '#00E5C3', '#DCE600', '#E67200'];
    const randomIndex = Math.floor(Math.random() * colorList.length);

    return colorList[randomIndex];
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
      <View style={{ height: StatusBar.currentHeight, backgroundColor: COLORS.white }}></View>

      <View style={styles.top}>
        <Text style={styles.logo}>TROTTERS</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Ionicons
            name="settings-outline"
            size={26}
            color={COLORS.gray}
            style={{ alignSelf: 'flex-end' }}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.user}>
          {/* Use the profileImage stored in AsyncStorage */}
          <Image
            style={styles.pfp}
            source={{ uri: userData.profileImage || require('../resources/pfp.png') }} // Fallback to default image if not available
          />
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.nationality}>{userData.nationality}</Text>
        </View>

        <View style={styles.attribute}>
          <Text style={styles.tag}>Age</Text>
          <Text style={styles.info}>{userData.age}</Text>
        </View>

        <View style={styles.attribute}>
          <Text style={styles.tag}>Interests</Text>
          <View style={styles.interests}>
            {userData.interests.map((interest, index) => {
              const randomColor = getRandomColor();
              return (
                <View key={index} style={[styles.interestContainer, { borderColor: randomColor }]}>
                  <View style={[styles.circle, { backgroundColor: randomColor }]} />
                  <Text style={styles.interest}>{interest}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.attribute}>
          <Text style={styles.tag}>About Me</Text>
          <Text style={styles.info}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit...</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;