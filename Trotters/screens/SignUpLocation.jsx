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
        const allLocations = [];
        const countries = Object.keys(locations);
        countries.forEach(country => {
            allLocations.push(country); 
            locations[country].forEach(city => {
                allLocations.push(`${city}, ${country}`); 
            });
        });

        if (allLocations.includes(searchText)) {
            setShowFlatList(false);
            setIsValid(true);
            
            setSignUpData(prevData => ({
                ...prevData,
                location: searchText
            }));

        } else if (searchText) {
            const results = allLocations.filter(location =>
                location.toLowerCase().includes(searchText.toLowerCase())
            ).slice(0, 13);
            setFilteredLocations(results);
            setShowFlatList(true);
            setIsValid(false);
            
        } else {
            setShowFlatList(false);
            setIsValid(false);
        }
    }, [searchText]);

    const handleLocationPress = async (item) => {
        setSearchText(item);
    };

    const invalidForm = () => {
        Alert.alert('Invalid form', 'Please choose a location.');
    };

    return(
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior='height'
                style={styles.searchContainer}>
                <View style={styles.searchBarContainer}>
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
                                <TouchableOpacity style={styles.item} onPress={() => handleLocationPress(item)}>
                                    <Text style={{ fontFamily: 'Poppins-Medium', color:COLORS.black }}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </KeyboardAvoidingView>

            <View style={styles.button}>
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