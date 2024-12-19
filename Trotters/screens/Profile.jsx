import { Text, View, Image, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./profile.style";
import { COLORS, SIZES } from "../resources";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Profile = ({navigation}) => {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await AsyncStorage.getItem('trottersApp');
        const parsedData = JSON.parse(data);
        setUserData(parsedData);
        setLoading(false);
      } catch (error) {
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
        <ActivityIndicator size={SIZES.large} color="#6200EE"/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>TROTTERS</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate("Settings")}
          style={styles.settingsWrapper}>
          <Ionicons
            name="settings-sharp"
            size={30}
            color={COLORS.gray}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.dataContainer}>
        <View style={styles.user}>
          <Image
            source={{ uri: userData.profileImage }} 
            style={styles.profileImage}
          />
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.location}>{userData.location}</Text>
        </View>

        <View style={styles.attribute}>
          <Text style={styles.tag}>Age</Text>
          <Text style={styles.data}>{userData.age}</Text>
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
          <Text style={styles.data}>{userData.description}</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;