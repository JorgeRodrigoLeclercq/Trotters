import { View, Text, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './signUpLocation.style';
import { COLORS } from '../resources';
import Button from '../components/Button';
import locations from '../resources/locations.json';

const SignUpLocation = ({ route, navigation }) => {
    const [signUpData, setSignUpData] = useState(route.params.data);
    const [searchText, setSearchText] = useState('');
    const [showFlatList, setShowFlatList] = useState(false);
    const [filteredLocations, setFilteredLocations] = useState([]);
    const [isValid, setIsValid] = useState(false);

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
        if (allLocations.includes(searchText)) { // search text is a valid location
            setShowFlatList(false);
            setIsValid(true);
            
            setSignUpData(prevData => ({
                ...prevData,
                location: searchText
            }));

        } else if (searchText) { // search text is not a valid location
            const results = allLocations.filter(location =>
                location.toLowerCase().includes(searchText.toLowerCase())
            ).slice(0, 13);
            setFilteredLocations(results);
            setShowFlatList(true);
            setIsValid(false);
            
        } else { // search text is ''
            setShowFlatList(false);
            setIsValid(false);
        }
    }, [searchText]);

    const invalidForm = () => {
        Alert.alert('Invalid form', 'Please choose a location.');
    };

    return(
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior='height'
                style={styles.searchBarContainer}
            >
                <View style={styles.searchBarWrapper}>
                    <TextInput
                        style={styles.searchBar}
                        placeholder='Where are you from?'
                        placeholderTextColor={COLORS.gray}
                        color={COLORS.black}
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
                                <TouchableOpacity style={styles.item} onPress={() => setSearchText(item)}>
                                    <Text style={{ fontFamily: 'Poppins-Medium', color:COLORS.black }}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </KeyboardAvoidingView>

            <View style={styles.buttonContainer}>
                <Button 
                    title='Continue' 
                    onPress={isValid ? 
                        (() => {
                        navigation.navigate('SignUpInterests', {
                            data: signUpData
                        })}) 
                        : 
                        (invalidForm)}
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