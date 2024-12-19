import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import styles from "./signUpLocation.style";
import { COLORS } from "../resources";
import Button from "../components/Button";
import locations from '../resources/locations.json';

const SignUpLocation = ({ route, navigation }) => {
    const [signUpData, setSignUpData] = useState(route.params.data);
    const [searchText, setSearchText] = useState('');
    const [showFlatList, setShowFlatList] = useState(false);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [endOfSearch, setEndOfSearch] = useState(false);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const allLocations = [];
        const countries = Object.keys(locations);
        countries.forEach(country => {
            allLocations.push(country); 
            locations[country].forEach(city => {
                allLocations.push(`${city}, ${country}`); 
            });
        });

        if (searchText && endOfSearch) {
            setEndOfSearch(false);
            setShowFlatList(false);
            setIsValid(true);
            
            setSignUpData(prevData => ({
                ...prevData,
                location: searchText
            }));

        } else if (searchText) {
            const results = allLocations.filter(location =>
                location.toLowerCase().includes(searchText.toLowerCase())
            ).slice(0, 15);
            setFilteredLocations(results);
            setShowFlatList(true);
            setIsValid(false);
        }
    }, [searchText]);

    const handleLocationPress = async (item) => {
        setEndOfSearch(true);
        setSearchText(item);
    };

    return(
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.searchBarContainer}>
                    <TextInput
                        style={styles.searchBar}
                        placeholder="Where are you from?"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>

                {showFlatList && (
                    <View style={styles.flatListContainer}>
                        <FlatList
                            style={styles.flatList}
                            data={filteredLocations}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.item} onPress={() => handleLocationPress(item)}>
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </View>

            <View style={styles.button}>
                <Button 
                    title="Continue" 
                    onPress={() => {
                        navigation.navigate("SignUpInterests", {
                            data: signUpData
                        });
                    }}
                    isValid={isValid}
                    isLoading={false}
                    color={COLORS.primary} 
                    textColor={COLORS.white}
                />
            </View>
        </View>
    );
};

export default SignUpLocation;