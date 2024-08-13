import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import locations from '../resources/locations.json'; // Adjust the path accordingly
import axios from "axios";
import styles from "./search.style";
//import { BlurView } from '@react-native-community/blur';
import Modal from 'react-native-modal';
import ProfileModal from '../components/ProfileModal'; // Import the new ProfileModal component

const Search = ({navigation}) => {
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

    const handleItemPress = async (item) => {
        try {
            const response = await axios.get(`http://192.168.1.97:3000/api/people/${item}`);
            setUsers(response.data);
            setShowFlatList(false);
            console.log(response.data);
        } catch (error) {
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
                        {/* <View style={styles.userCard}> */}
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>{user.name}</Text>
                                <Text style={styles.userAge}>{user.age} years old</Text>
                            </View>
                            <Image source={require('../resources/pfp.png')} style={styles.profileImage} />
                        {/* </View> */}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                {/* <ScrollView contentContainerStyle={styles.userContainer}>
                    {users.map(user => (
                        <TouchableOpacity key={user._id} onPress={() => handleUserPress(user)}>
                            <View style={styles.userCard}>
                                <View style={styles.userInfo}>
                                    <Text style={styles.userName}>{user.name}</Text>
                                    <Text style={styles.userAge}>{user.age} years old</Text>
                                </View>
                                <Image source={require('../resources/pfp.png')} style={styles.profileImage} />
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView> */}
                {/* {isModalVisible && (
                    <BlurView
                        style={StyleSheet.absoluteFill}
                        blurType="light"
                        blurAmount={10}
                    />
                )} */}
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


// import React from 'react';
// import styles from "./search.style";
// import { TouchableOpacity, View, TextInput, FlatList, Text, ActivityIndicator, SafeAreaView, Image } from "react-native";
// import {Ionicons} from "@expo/vector-icons";
// import { useState, useEffect } from 'react';
// import { COLORS } from '../resources';
// import axios from "axios";


// //const API_ENDPOINT = "../resources/locations.json";

// const Search = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [fullData, setFullData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     setIsLoading(true);
//     fetchData();
//   }, [])

//   const fetchData = async(url) => {
//     const nationalities = require("../resources/locations.json");
//     const transformedData = Object.keys(nationalities).map(key => ({
//       country: key,
//       city: nationalities[key]
//     }));
//     setData(transformedData);
//     setFullData(transformedData);
//     setIsLoading(false);
//   }

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     if (query.trim() === '') {
//       setData(fullData);  // If the search query is empty, restore the full data
//     } else {
//       const filteredData = fullData.filter(item =>
//         item.city.toLowerCase().includes(query.toLowerCase()) ||
//         item.country.toLowerCase().includes(query.toLowerCase())
//       );
//       setData(filteredData);  // Set data to filtered results
//     }
//   }

//   const handleSelectItem = async(item) => {
//     setSelectedItem(item);
//     try {
//       console.log(item);
//       const response = await axios.get(`http://192.168.1.97:3000/api/people/search/${item.city}, ${item.country}`);
//       //console.log(response);
//       console.log("=================");
//       console.log(response.data);
//       console.log("=================");
//       } catch (error) {
//           console.log("Failed to get the products", error);
//       } 
//   };

//   if (isLoading) {
//     return(
//       <View style={{flex: 1, justifyContent: "center", alignContent: "center"}}>
//         <ActivityIndicator size={"large"} color={COLORS.black}/>
//       </View>
//     );
//   }

//   if (error) {
//     return(<View>
//       <Text>Error in fetching the data</Text>
//     </View>)
//   }

//   if (selectedItem) {
//     return (
//       <View style={{backgroundColor: COLORS.lightWhite, height: "100%", justifyContent: "center", alignContent: "center"}}>
//         <Image
//           source={require('../resources/pfp.png')} // Replace this URL with your image URL
//           style={{ width: 200, height: 200, borderRadius: 100 }}
//           //resizeMode="contain"
//         />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.containerGPT}>
//       <TextInput
//         placeholder="Search"
//         clearButtonMode="always"
//         style={styles.searchBoxGPT}
//         autoCapitalize="none"
//         //autoCorrect="false"
//         value={searchQuery}
//         onChangeText={(query) => handleSearch(query)}
//       />
//       <FlatList
//       data={data}
//       keyExtractor={(item, index) => index.toString()}  // Use index as key extractor
//       renderItem={({item}) => (
//         <TouchableOpacity onPress={() => handleSelectItem(item)}>
//             <View style={styles.listItem}>
//               <Text style={styles.listItemText}>{item.city}, {item.country}</Text>
//             </View>
//         </TouchableOpacity>
//       )}
//       />
         
//     </SafeAreaView>
//   );
// };

// export default Search;

// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
// import RNFS from 'react-native-fs';

// const SearchScreen = () => {
//     const [searchText, setSearchText] = useState('');
//     const [locations, setLocations] = useState([]);
//     const [filteredLocations, setFilteredLocations] = useState([]);

//     useEffect(() => {
//         const fetchLocations = async () => {
//             const path = '/../resources/locations.json';
//             try {
//                 const data = await RNFS.readFile(path, 'utf8');
//                 const json = JSON.parse(data);
//                 const allLocations = [];
//                 for (const country in json) {
//                     json[country].forEach(city => {
//                         allLocations.push(`${city}, ${country}`);
//                     });
//                 }
//                 setLocations(allLocations);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchLocations();
//     }, []);

//     useEffect(() => {
//         if (searchText) {
//             const results = locations.filter(location =>
//                 location.toLowerCase().includes(searchText.toLowerCase())
//             ).slice(0, 10);
//             setFilteredLocations(results);
//         } else {
//             setFilteredLocations([]);
//         }
//     }, [searchText, locations]);

//     return (
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.searchBar}
//                 placeholder="Search for a city"
//                 value={searchText}
//                 onChangeText={setSearchText}
//             />
//             <FlatList
//                 data={filteredLocations}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({ item }) => (
//                     <View style={styles.item}>
//                         <Text>{item}</Text>
//                     </View>
//                 )}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#fff',
//     },
//     searchBar: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         paddingLeft: 10,
//         borderRadius: 5,
//         marginBottom: 20,
//     },
//     item: {
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
// });

// export default SearchScreen;

// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// import locations from '../resources/locations.json'; // Adjust the path accordingly
// import axios from "axios";

// const Search = () => {
//     const [searchText, setSearchText] = useState('');
//     const [filteredLocations, setFilteredLocations] = useState([]);

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
//             setFilteredLocations(results);
//         } else {
//             setFilteredLocations([]);
//         }
//     }, [searchText]);

//     const handleItemPress = async (item) => {
//         try {
//             const response = await axios.get(`http://192.168.1.97:3000/api/people/search/${item}`);
//             console.log(response.data);
//             //Alert.alert('API Response', JSON.stringify(response.data));
//         } catch (error) {
//             //Alert.alert('Error', 'Failed to fetch data from the API');
//             console.error(error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.searchBar}
//                 placeholder="Search for a city"
//                 value={searchText}
//                 onChangeText={setSearchText}
//             />
//             <FlatList
//                 data={filteredLocations}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({ item }) => (
//                     <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
//                         <Text>{item}</Text>
//                     </TouchableOpacity>
//                 )}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#fff',
//     },
//     searchBar: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         paddingLeft: 10,
//         borderRadius: 5,
//         marginBottom: 20,
//     },
//     item: {
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
// });

// export default Search;

// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// import locations from '../resources/locations.json'; // Adjust the path accordingly
// import axios from "axios";

// const Search = () => {
//     const [searchText, setSearchText] = useState('');
//     const [filteredLocations, setFilteredLocations] = useState([]);

//     useEffect(() => {
//         const allLocations = [];
//         const countries = Object.keys(locations);

//         countries.forEach(country => {
//             allLocations.push({ city: '', country }); // Add country-only entries
//             locations[country].forEach(city => {
//                 allLocations.push({ city, country }); // Add city-country pairs
//             });
//         });

//         if (searchText) {
//             const results = allLocations.filter(location => {
//                 const locationString = location.city ? `${location.city}, ${location.country}` : location.country;
//                 return locationString.toLowerCase().includes(searchText.toLowerCase());
//             }).slice(0, 10);
//             setFilteredLocations(results);
//         } else {
//             setFilteredLocations([]);
//         }
//     }, [searchText]);

//     const handleItemPress = async (item) => {
//         const query = item.city ? `${item.city},${item.country}` : item.country;
//         try {
//             const response = await axios.get(`http://192.168.1.97:3000/api/people/search/${query}`);
//             console.log(response.data);
//             // You can use Alert to show the API response
//             // Alert.alert('API Response', JSON.stringify(response.data));
//         } catch (error) {
//             // Alert.alert('Error', 'Failed to fetch data from the API');
//             console.error(error);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <TextInput
//                 style={styles.searchBar}
//                 placeholder="Search for a city or country"
//                 value={searchText}
//                 onChangeText={setSearchText}
//             />
//             <FlatList
//                 data={filteredLocations}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({ item }) => (
//                     <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
//                         <Text>{item.city ? `${item.city}, ${item.country}` : item.country}</Text>
//                     </TouchableOpacity>
//                 )}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#fff',
//     },
//     searchBar: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         paddingLeft: 10,
//         borderRadius: 5,
//         marginBottom: 20,
//     },
//     item: {
//         padding: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//     },
// });

// export default Search;