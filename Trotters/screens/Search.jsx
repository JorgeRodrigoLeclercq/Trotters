import { View, Text, TextInput, FlatList, TouchableOpacity, Image, ScrollView, Modal, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './search.style';
import ProfileModal from '../components/ProfileModal';
import locations from '../resources/locations.json';

const Search = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [users, setUsers] = useState([]);
    const [showFlatList, setShowFlatList] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const allLocations = [];
        const countries = Object.keys(locations);
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

    const handleLocationPress = async (item) => {
        setSearchText(item); 
        setShowFlatList(false); 

        try {
            const userInterestsString = await AsyncStorage.getItem('trottersApp');
            const userInterests = JSON.parse(userInterestsString)?.interests || [];

            const response = await axios.get(`http://192.168.0.22:3000/api/people/search/${item}`);
            const usersData = response.data;

            const sortedUsers = usersData.sort((a, b) => {
                const commonInterestsA = getCommonInterestsCount(userInterests, a.interests);
                const commonInterestsB = getCommonInterestsCount(userInterests, b.interests);
                return commonInterestsB - commonInterestsA;
            });

            setUsers(sortedUsers);
            setShowFlatList(false);

        } catch (error) {
            Alert.alert("Error", "Failed to fetch users from the location.");
        }
    };

    const handleUserPress = (user) => {
        setSelectedUser(user);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedUser(null);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <TextInput
                    placeholder="Where are you going?"
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
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )}
                        style={styles.flatList}
                    />
                </View>
            )}

            <ScrollView contentContainerStyle={styles.usersContainer} showsVerticalScrollIndicator={false} >
                {users.map(user => (
                    <TouchableOpacity 
                        key={user.email} 
                        onPress={() => handleUserPress(user)}
                        style={styles.userCard}
                    >
                        <View style={styles.userData}>
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
                animationType="fade"
                onRequestClose={closeModal}>
                <View style={styles.modalWrapper}>
                    <ProfileModal
                        user={selectedUser}
                        onClose={closeModal}
                    />
                </View>
            </Modal>
        </View>
    );
};

export default Search;