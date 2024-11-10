import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, ScrollView, SafeAreaView, Alert } from 'react-native';
import locations from '../resources/locations.json';
import styles from './search.style';
import axios from "axios";
import { Modal } from 'react-native';
import ProfileModal from '../components/ProfileModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../resources';
//import Ionicons from 'react-native-vector-icons/Ionicons';

//import { COLORS } from '../resources';

const Search = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [users, setUsers] = useState([]);
    const [showFlatList, setShowFlatList] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const allLocations = [];
        const countries = Object.keys(locations);
        console.log(isModalVisible);
        countries.forEach(country => {
            allLocations.push(country); 
            locations[country].forEach(city => {
                allLocations.push(`${city}, ${country}`); 
            });
        });

        if (searchText) {
            const results = allLocations.filter(location =>
                location.toLowerCase().includes(searchText.toLowerCase())
            ).slice(0, 10);
            setFilteredLocations(results);
            setShowFlatList(true);
        } else {
            setFilteredLocations([]);
            setShowFlatList(false);
        }
    }, [searchText]);

    const getCommonInterestsCount = (userInterests, otherUserInterests) => {
        return userInterests.filter(interest => otherUserInterests.includes(interest)).length;
    };

    const handleItemPress = async (item) => {
        setSearchText(item); // Update the searchText with the selected item
        setShowFlatList(false); // Hide the FlatList after selection
        try {
            const userInterestsString = await AsyncStorage.getItem('testingTrotters1info');
            const userInterests = JSON.parse(userInterestsString)?.interests || [];

            const response = await axios.get(`http://192.168.0.19:3000/api/people/${item}`);
            const usersData = response.data;

            const sortedUsers = usersData.sort((a, b) => {
                const commonInterestsA = getCommonInterestsCount(userInterests, a.interests);
                const commonInterestsB = getCommonInterestsCount(userInterests, b.interests);
                return commonInterestsB - commonInterestsA;
            });

            setUsers(sortedUsers);
            setShowFlatList(false);
            console.log(sortedUsers);

        } catch (error) {
            Alert.alert("Error", "Failed to fetch users from the location.");
            console.error(error);
        }
    };

    const handleUserPress = (user) => {
        setSelectedUser(user);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setSelectedUser(null);
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Where are you going?"
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <TouchableOpacity style={styles.searchIcon}>
                    {/* <Ionicons name={"search"}
                        size={24}
                        color={COLORS.gray}
                        marginTop={7.5}
                    /> */}
                </TouchableOpacity>
            </View>

            {showFlatList && (
                <View style={styles.flatListContainer}>
                    <FlatList
                        style={styles.flatList}
                        data={filteredLocations}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            )}

            <ScrollView contentContainerStyle={styles.userContainer} showsVerticalScrollIndicator={false} >
                {users.map(user => (
                    <TouchableOpacity key={user._id} style={styles.userCard} onPress={() => handleUserPress(user)}>
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>{user.name}</Text>
                            <Text style={styles.userAge}>{user.age} years old</Text>
                        </View>
                        <Image source={require('../resources/pfp.png')} style={styles.profileImage} />
                    </TouchableOpacity>
                ))}
            </ScrollView>
            
            <Modal
                visible={isModalVisible}
                backdropColor={COLORS.gray}
                onBackdropPress={closeModal}
                style={styles.modal}
                // transparent={true}
                // animationType="slide"
                // onRequestClose={closeModal}
            >
                <ProfileModal user={selectedUser} onClose={closeModal} navigation={navigation} />
            </Modal>
        </View>
    </SafeAreaView>
    );
};

export default Search;

// import { View, Text } from 'react-native';
// const Search = () => {

//     return(
//         <View>
//             <Text>
//                 Hello
//             </Text>
//         </View>
//     )
// }

// export default Search;