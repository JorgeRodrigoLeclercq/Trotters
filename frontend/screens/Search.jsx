import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Image, ScrollView, SafeAreaView, Alert } from 'react-native';
import locations from '../resources/locations.json';
import axios from "axios";
import styles from "./search.style";
import Modal from 'react-native-modal';
import ProfileModal from '../components/ProfileModal'; // Import the new ProfileModal component
import AsyncStorage from '@react-native-async-storage/async-storage';

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

        countries.forEach(country => {
            allLocations.push(country); // Add country-only entries
            locations[country].forEach(city => {
                allLocations.push(`${city}, ${country}`); // Add city-country pairs
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

    const handleItemPress = async (item) => { // Show users from location 'item'
        try {
            const userInterestsString = await AsyncStorage.getItem('testingTrotters1info');
            const userInterests = JSON.parse(userInterestsString)?.interests || [];

            const response = await axios.get(`http://192.168.1.37:3000/api/people/${item}`);
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
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search for a city or country"
                    value={searchText}
                    onChangeText={setSearchText}
                />

                {showFlatList && (
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
                )}

                <ScrollView contentContainerStyle={styles.userContainer}>
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
                    isVisible={isModalVisible}
                    onBackdropPress={closeModal}
                    style={styles.modal}
                >
                    <ProfileModal user={selectedUser} onClose={closeModal} navigation={navigation} />
                </Modal>
            </View>
        </SafeAreaView>
    );
};

export default Search;

// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, FlatList, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
// import locations from '../resources/locations.json';
// import axios from "axios";
// import styles from "./search.style";
// import Modal from 'react-native-modal';
// import ProfileModal from '../components/ProfileModal'; // Import the new ProfileModal component

// const Search = ({navigation}) => {
//     const [searchText, setSearchText] = useState('');
//     const [filteredLocations, setFilteredLocations] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [showFlatList, setShowFlatList] = useState(true);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [selectedUser, setSelectedUser] = useState(null);

//     useEffect(() => {
//         const allLocations = [];
//         const countries = Object.keys(locations);

//         countries.forEach(country => {
//             allLocations.push(country); // Add country-only entries
//             locations[country].forEach(city => {
//                 allLocations.push(`${city}, ${country}`); // Add city-country pairs
//             });
//         });

//         if (searchText) {
//             const results = allLocations.filter(location =>
//                 location.toLowerCase().includes(searchText.toLowerCase())
//             ).slice(0, 10);
//                 setFilteredLocations(results);
//                 setShowFlatList(true);
//             } else {
//                 setFilteredLocations([]);
//                 setShowFlatList(false);
//             }
//     }, [searchText]);

//     const handleItemPress = async (item) => { // Show users from location 'item'
//         try {
//             const response = await axios.get(`http://192.168.1.38:3000/api/people/${item}`);
//             setUsers(response.data);
//             setShowFlatList(false);
//             console.log(response.data);
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleUserPress = (user) => {
//         setSelectedUser(user);
//         setIsModalVisible(true);
//     };

//     const closeModal = () => {
//         setIsModalVisible(false);
//         setSelectedUser(null);
//     };

//     return (
//         <SafeAreaView style={styles.safeContainer}>
//             <View style={styles.container}>
//                 <TextInput
//                     style={styles.searchBar}
//                     placeholder="Search for a city or country"
//                     value={searchText}
//                     onChangeText={setSearchText}
//                 />

//                 {showFlatList && (
//                     <FlatList
//                         style={styles.flatList}
//                         data={filteredLocations}
//                         keyExtractor={(item, index) => index.toString()}
//                         renderItem={({ item }) => (
//                             <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
//                                 <Text>{item}</Text>
//                             </TouchableOpacity>
//                         )}
//                     />
//                 )}

//                 <ScrollView contentContainerStyle={styles.userContainer}>
//                     {users.map(user => (
//                         <TouchableOpacity key={user._id} style={styles.userCard} onPress={() => handleUserPress(user)}>
//                             <View style={styles.userInfo}>
//                                 <Text style={styles.userName}>{user.name}</Text>
//                                 <Text style={styles.userAge}>{user.age} years old</Text>
//                             </View>
//                             <Image source={require('../resources/pfp.png')} style={styles.profileImage} />
//                         </TouchableOpacity>
//                     ))}
//                 </ScrollView>
                
//                 <Modal
//                     isVisible={isModalVisible}
//                     onBackdropPress={closeModal}
//                     style={styles.modal}
//                 >
//                     <ProfileModal user={selectedUser} onClose={closeModal} navigation={navigation} />
//                 </Modal>
//             </View>
//         </SafeAreaView>
//     );
// };

// export default Search;