import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, Alert, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./signUp.style";
import * as Yup from 'yup';
import React, { useState } from 'react';
//import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../resources/index";
import Button from '../components/Button';
import { Formik } from 'formik';
import locations from '../resources/locations.json';
import axios from "axios";

const generateValidLocations = (locations) => {
    let validLocations = [];
    for (let country in locations) {
        validLocations.push(country);
        locations[country].forEach(city => {
            validLocations.push(`${city}, ${country}`);
        });
    }
    return validLocations;
};

const validLocations = generateValidLocations(locations);
const interestOptions = ["music", "movies", "nature", "reading", "videogames", "food", "partying"];

const validationSchema = Yup.object().shape({
    nationality: Yup.string()
        .oneOf(validLocations, "Provide a valid location")
        .required("Required"),
    name: Yup.string()
        .min(3, "Provide a valid name")
        .required("Required"),
    age: Yup.string()
        .required("Required"),
    description: Yup.string()
        .min(10, "Description must be at least 10 characters")
        .max(200, "Description must be at most 200 characters")
        .required("Required"),
    interests: Yup.array()
        .of(Yup.string().required("Each interest is required"))
        .length(3, "You must select exactly 3 interests")
        .required("Required")
});

const SignUp = ({route}) => {
    const [loader, setLoader] = useState(false);
    const [obscureText, setObscureText] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [filteredLocations, setFilteredLocations] = useState(validLocations);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const email = route.params.email;

    const invalidForm = () => {
        Alert.alert(
            "Invalid Form",
            "Please provide all required fields",
            [
                { text: "Cancel", onPress: () => console.log("Error") },
                { text: "Continue", onPress: () => { } },
                { defaultIndex: 1 }
            ]
        )
    };

    const handleLocationInputChange = (value) => {
        setFilteredLocations(
            validLocations.filter(location =>
                location.toLowerCase().includes(value.toLowerCase())
            )
        );
    };

    const handleInterestSelect = (interest, setFieldValue) => {
        let newSelectedInterests = [...selectedInterests];
        if (newSelectedInterests.includes(interest)) {
            newSelectedInterests = newSelectedInterests.filter(i => i !== interest);
        } else {
            if (newSelectedInterests.length < 3) {
                newSelectedInterests.push(interest);
            } else {
                Alert.alert("You can only select up to 3 interests");
            }
        }
        setSelectedInterests(newSelectedInterests);
        setFieldValue("interests", newSelectedInterests);
    };

    const register = async (values) => {
        setLoader(true);
        console.log(values);

        try {
            const endpoint = "http://192.168.0.19:3000/api/people/register";
            const data = {...values, email};

            const response = await axios.post(endpoint, data);

            if (response.status === 200) {
                setLoader(false);
                console.log(response.data);
            } else {
                Alert.alert(
                    "Error logging in",
                    "Please provide valid credentials",
                    [
                        {
                            text: "Cancel", onPress: () => console.log(response.status)
                        },
                        {
                            text: "Continue", onPress: () => { }
                        },
                        { defaultIndex: 1 }
                    ]
                )
            }
        } catch (error) {
            Alert.alert(
                "Error logging in",
                "Oops",
                [
                    {
                        text: "Cancel", onPress: () => console.log(error)
                    },
                    {
                        text: "Continue", onPress: () => { }
                    },
                    { defaultIndex: 1 }
                ]
            )
            console.log(error);
        } finally {
            setLoader(false);
        }
    }

    return (
        <ScrollView>
            <SafeAreaView style={{ marginHorizontal: 20 }}>
                <View>
                    <Image
                        source={require("../resources/pfp.png")}
                        style={styles.cover}
                    />

                    <Text style={styles.title}> LOG IN </Text>
                    <Formik
                        initialValues={{ nationality: '', name: '', age: '', description: '', interests: [] }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => register(values)}
                    >
                        {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched, setFieldValue }) => (
                            <View>
                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Full name</Text>
                                    <View style={styles.inputWrapper(touched.name ? COLORS.primary : COLORS.offwhite)}>
                                        {/* <MaterialCommunityIcons
                                            name='face-man-profile'
                                            size={20}
                                            color={COLORS.gray}
                                            style={styles.iconStyle}
                                        /> */}
                                        <TextInput
                                            placeholder='Enter your full name'
                                            onFocus={() => { setFieldTouched('name') }}
                                            onBlur={() => { setFieldTouched('name', '') }}
                                            value={values.name}
                                            onChangeText={handleChange('name')}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1 }}
                                        />
                                    </View>
                                    {touched.name && errors.name && (
                                        <Text style={styles.errorMessage}>{errors.name}</Text>
                                    )}
                                </View>
                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Age</Text>
                                    <View style={styles.inputWrapper(touched.age ? COLORS.primary : COLORS.offwhite)}>
                                        {/* <MaterialCommunityIcons
                                            name='numeric-0'
                                            size={20}
                                            color={COLORS.gray}
                                            style={styles.iconStyle}
                                        /> */}
                                        <TextInput
                                            placeholder='Enter your age'
                                            onFocus={() => { setFieldTouched('age') }}
                                            onBlur={() => { setFieldTouched('age', '') }}
                                            value={values.age}
                                            onChangeText={handleChange('age')}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1 }}
                                        />
                                    </View>
                                    {touched.age && errors.age && (
                                        <Text style={styles.errorMessage}>{errors.age}</Text>
                                    )}
                                </View>
                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Description</Text>
                                    <View style={styles.inputWrapper(touched.description ? COLORS.primary : COLORS.offwhite)}>
                                        {/* <MaterialCommunityIcons
                                            name='file-certificate-outline'
                                            size={20}
                                            color={COLORS.gray}
                                            style={styles.iconStyle}
                                        /> */}
                                        <TextInput
                                            placeholder='Enter a description'
                                            onFocus={() => { setFieldTouched('description') }}
                                            onBlur={() => { setFieldTouched('description', '') }}
                                            value={values.description}
                                            onChangeText={handleChange('description')}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1 }}
                                        />
                                    </View>
                                    {touched.description && errors.description && (
                                        <Text style={styles.errorMessage}>{errors.description}</Text>
                                    )}
                                </View>
                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Interests</Text>
                                    <View style={styles.interestsContainer}>
                                        {interestOptions.map((interest, index) => (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() => handleInterestSelect(interest, setFieldValue)}
                                                style={[
                                                    styles.interestButton,
                                                    selectedInterests.includes(interest) && styles.selectedInterestButton
                                                ]}
                                            >
                                                <Text
                                                    style={[
                                                        styles.interestButtonText,
                                                        selectedInterests.includes(interest) && styles.selectedInterestButtonText
                                                    ]}
                                                >
                                                    {interest}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                    {touched.interests && errors.interests && (
                                        <Text style={styles.errorMessage}>{errors.interests}</Text>
                                    )}
                                </View>

                                <View style={styles.wrapper}>
                                    <Text style={styles.label}>Location</Text>
                                    <View style={styles.inputWrapper(touched.nationality ? COLORS.primary : COLORS.offwhite)}>
                                        {/* <Ionicons
                                            name='location-outline'
                                            size={20}
                                            color={COLORS.gray}
                                            style={styles.iconStyle}
                                        /> */}
                                        <TextInput
                                            placeholder='Enter nationality'
                                            onFocus={() => { setShowDropdown(true); setFieldTouched('nationality'); }}
                                            onBlur={() => { setShowDropdown(false); }}
                                            value={values.nationality}
                                            onChangeText={(value) => {
                                                handleChange('nationality')(value);
                                                handleLocationInputChange(value);
                                            }}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1 }}
                                        />
                                    </View>
                                    {touched.nationality && errors.nationality && (
                                        <Text style={styles.errorMessage}>{errors.nationality}</Text>
                                    )}
                                </View>

                                {showDropdown && (
                                    <View style={styles.dropdown}>
                                        <FlatList
                                            data={filteredLocations}
                                            keyExtractor={(item) => item}
                                            renderItem={({ item }) => (
                                                <TouchableOpacity
                                                    style={styles.dropdownItem}
                                                    onPress={() => {
                                                        setFieldValue('nationality', item);
                                                        setShowDropdown(false);
                                                    }}
                                                >
                                                    <Text>{item}</Text>
                                                </TouchableOpacity>
                                            )}
                                        />
                                    </View>
                                )}

                                <Button onPress={isValid ? handleSubmit : invalidForm} title="R E G I S T E R" isValid={isValid} />
                                <Text style={styles.registration} onPress={() => { navigation.navigate("SignUp") }}>Register</Text>
                            </View>
                        )}
                    </Formik>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

export default SignUp;