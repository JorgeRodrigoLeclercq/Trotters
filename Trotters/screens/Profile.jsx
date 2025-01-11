import { Text, View, Image, ActivityIndicator, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './profile.style';
import { COLORS, SIZES } from '../resources';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Profile = ({navigation}) => {

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Retrieve user's data
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('trottersApp');
        const parsedUserData = JSON.parse(userData);
        setUser(parsedUserData); 
        setIsLoading(false);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch user data.');
      }
    };

    fetchUserData();
  }, []);

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * COLORS.interestsColors.length);

    return COLORS.interestsColors[randomIndex];
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size={SIZES.large}/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../resources/trotters-logo-green.png')}
          style={styles.logo}
        />
        <TouchableOpacity 
          onPress={() => navigation.navigate('Settings')}
          style={styles.settingsButtonContainer}>
          <Ionicons
            name='settings-sharp'
            size={30}
            color={COLORS.gray}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.userDataContainer}>
        <View style={styles.upperDataContainer}>
          <Image
            source={{ uri: user.profileImage }} 
            style={styles.profileImage}
          />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.location}>{user.location}</Text>
        </View>

        <View style={styles.keyValueContainer}>
          <Text style={styles.key}>Age</Text>
          <Text style={styles.value}>{user.age}</Text>
        </View>

        <View style={styles.keyValueContainer}>
          <Text style={styles.key}>Interests</Text>
          <View style={styles.interestsContainer}>
            {user.interests.map((interest, index) => {
              const randomColor = getRandomColor();
              return (
                <View key={index} style={[styles.interestWrapper, { borderColor: randomColor }]}>
                  <View style={[styles.circle, { backgroundColor: randomColor }]} />
                  <Text style={styles.interest}>{interest}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.keyValueContainer}>
          <Text style={styles.key}>About Me</Text>
          <Text style={styles.value}>{user.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;