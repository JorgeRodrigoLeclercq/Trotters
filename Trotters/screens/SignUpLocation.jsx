import { View, Text, TextInput, FlatList, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import styles from "./signUpLocation.style";
import { COLORS } from "../resources";
import Button from "../components/Button";
import locations from '../resources/locations.json';

const SignUpLocation = ({navigation, route}) => {
    const signUpData = route.params;

    const [searchText, setSearchText] = useState('');
    const [showFlatList, setShowFlatList] = useState(false);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [endOfSearch, setEndOfSearch] = useState(false);

    useEffect(() => {
        const allLocations = [];
        const countries = Object.keys(locations);
        countries.forEach(country => {
            allLocations.push(country); 
            locations[country].forEach(city => {
                allLocations.push(`${city}, ${country}`); 
            });
        });

        if (searchText && !endOfSearch) {
            const results = allLocations.filter(location =>
                location.toLowerCase().includes(searchText.toLowerCase())
            ).slice(0, 10);
            setFilteredLocations(results);
            setShowFlatList(true);
        } else {
            setEndOfSearch(false);
            setFilteredLocations([]);
            setShowFlatList(false);
        }
    }, [searchText]);

    const handleItemPress = async (item) => {
        setEndOfSearch(true)
        setSearchText(item);
        setShowFlatList(false); 
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
                                <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
                                    <Text>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </View>

            <View style={styles.button}>
                <Button onPress = {()=>{navigation.navigate("SignUpInterests"), {signUpData: signUpData, location: searchText}}} loader = {false} title="Continue" color={COLORS.primary} colorText={COLORS.white}/>
            </View>
        </View>
    );
};

export default SignUpLocation;