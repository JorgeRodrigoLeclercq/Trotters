import { View, Text, TextInput, FlatList, TouchableOpacity, Image, ScrollView, Modal, Alert } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './search.style';
import { COLORS } from '../resources';
import ProfileModal from '../components/ProfileModal';
import locations from '../resources/locations.json';

const Search = ({ navigation }) => {
    const [userId, setUserId] = useState('');
    const [userInterests, setUserInterests] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [users, setUsers] = useState([]);
    const [showFlatList, setShowFlatList] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        // Retrieve user's data
        const fetchUserData = async () => {
          try {
            const userData = await AsyncStorage.getItem('trottersApp');
            const parsedUserData = JSON.parse(userData);
            setUserId(parsedUserData._id);
            setUserInterests(parsedUserData.interests);
          } catch (error) {
            Alert.alert('Error', 'Failed to fetch user data.');
          }
        };
    
        fetchUserData();
    }, []);

    useEffect(() => {
        // Load locations
        const allLocations = [];
        const countries = Object.keys(locations);
        countries.forEach(country => {
            allLocations.push(country); // countries 
            locations[country].forEach(city => {
                allLocations.push(`${city}, ${country}`); // cities 
            });
        });

        // Change Flat List based on search text
        if (searchText) {
            const results = allLocations.filter(location =>
                location.toLowerCase().includes(searchText.toLowerCase())
            ).slice(0, 10);
            setFilteredLocations(results);
            setShowFlatList(true);
        } else { // search text is ''
            setFilteredLocations([]);
            setShowFlatList(false);
        }
    }, [searchText]);

    useFocusEffect(
        useCallback(() => {
            setModalVisible(false);
        }, [])
    );      

    const getCommonInterestsCount = (userInterests, otherUserInterests) => {
        return userInterests.filter(interest => otherUserInterests.includes(interest)).length;
    };

    // Retrieve list of users from location = item and sort them based on the number of interests they share in common with the user
    const handleLocationPress = async (item) => {
        setSearchText(item); 
        setShowFlatList(false); 
        
        try {
            // Retrieve list of users from location = item
            const response = await axios.get(`http://192.168.0.22:3000/api/users/search`, {
                params: { 
                    userId, 
                    location: item }
            });

            const usersData = response.data;

            // Sort them based on the number of interests they share in common with the user
            const sortedUsers = usersData.sort((a, b) => {
                const commonInterestsA = getCommonInterestsCount(userInterests, a.interests);
                const commonInterestsB = getCommonInterestsCount(userInterests, b.interests);
                return commonInterestsB - commonInterestsA;
            });

            setUsers(sortedUsers);
            setShowFlatList(false);

        } catch (error) {
            Alert.alert('Error', 'Failed to fetch users from the location.');
        }
    };

    const handleUserPress = (user) => {
        setSelectedUser(user);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedUser({});
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <TextInput
                    placeholder='Where are you going?'
                    placeholderTextColor={COLORS.gray}
                    value={searchText}
                    onChangeText={setSearchText}
                    style={styles.searchBar}
                />
            </View>

            {showFlatList && (
                <View style={styles.flatListContainer}>
                    <FlatList
                        data={filteredLocations}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.item} onPress={() => handleLocationPress(item)}>
                                <Text style={{ fontFamily: 'Poppins-Medium', color:COLORS.black }}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        style={styles.flatList}
                    />
                </View>
            )}

            <ScrollView contentContainerStyle={styles.usersContainer} showsVerticalScrollIndicator={false} >
                {users.map(user => (
                    <TouchableOpacity 
                        key={user._id} 
                        onPress={() => handleUserPress(user)}
                        style={styles.userCard}
                    >
                        <View style={styles.userDataContainer}>
                            <Text style={styles.userName}>{user.name}</Text>
                            <Text style={styles.userAge}>{user.age} years old</Text>
                        </View>
                        
                        <Image 
                            source={{ uri: user.profileImage }}
                            style={styles.profileImage}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Modal  
                visible={modalVisible}
                transparent={true}
                animationType='fade'>
                <View style={styles.modalContainer}>
                    <ProfileModal
                        user={selectedUser}
                        interests={userInterests}
                        onClose={closeModal}
                        navigation={navigation}
                    />
                </View>
            </Modal>
        </View>
    );
};

export default Search;