import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./signUp.style";
import * as Yup from 'yup';
import React, { useState } from 'react';
import { COLORS } from "../resources/index";
import Button from '../components/Button';
import { Formik } from 'formik';
import axios from "axios";
import {launchImageLibrary} from 'react-native-image-picker';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(1, "Provide a valid name")
        .required("Required"),
    age: Yup.number()
        .required("Required"),
    description: Yup.string()
        .min(10, "Description must be at least 10 characters")
        .max(200, "Description must be at most 200 characters")
        .required("Required")
});

const SignUp = ({route, navigation}) => {
    const email = route.params.email;
    const [profileImage, setProfileImage] = useState(null); 
    const [loader, setLoader] = useState(false);

    const requestImagePermission = async () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 300,
            quality: 1,
        };
        
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                Alert.alert("Image selection cancelled");
            } else if (response.errorMessage) {
                Alert.alert("ImagePicker Error:", response.errorMessage);
            } else {
                const uri = response.assets[0].uri;
                setProfileImage(uri);
            }
        });
    };

    const handleImageSelection = async (setFieldValue) => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
        });
        if (result.assets && result.assets[0].uri) {
            setFieldValue('profileImage', result.assets[0].uri);
        } else if (result.didCancel) {
            Alert.alert("Image selection cancelled");
        } else {
            Alert.alert("Error selecting image");
        }
    };

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


    const signUp = async (values) => {
        setLoader(true);
    
        const formData = new FormData();
    
        Object.keys(values).forEach((key) => {
            if (key === 'profileImage') {
                const fileExtension = values.profileImage.split('.').pop().toLowerCase();
                const validTypes = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png' };
    
                if (!validTypes[fileExtension]) {
                    Alert.alert("Invalid file type", "Only JPEG, JPG, and PNG images are supported.");
                    setLoader(false);
                    return;
                }
    
                formData.append('profileImage', {
                    uri: values.profileImage,
                    type: validTypes[fileExtension], 
                    name: `profile.${fileExtension}`, 
                });
            } else {
                formData.append(key, values[key]);
            }
        });
    
        formData.append('email', email);
    
        try {
            const endpoint = "http://192.168.0.22:3000/api/people/signUp";
            const response = await axios.post(endpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
    
            if (response.status === 200) {
                Alert.alert("Success", "Signed up successfully");
            } else {
                Alert.alert("Error", "Failed to sign up");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Something went wrong");
        } finally {
            setLoader(false);
        }
    };
    

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <SafeAreaView style={{ marginHorizontal: 20 }}>
            <View>
                <Formik
                    initialValues={{
                        name: '',
                        age: '',
                        description: '',
                        profileImage: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => signUp(values)}
                >
                    {({ handleChange, touched, handleSubmit, values, errors, isValid, setFieldValue, setFieldTouched }) => (
                        <View>
                            <TouchableOpacity
                            onPress={() => handleImageSelection(setFieldValue)}
                            style={styles.imageWrapper}
                        >
                            <Image
                                source={values.profileImage ? { uri: values.profileImage } : require("../resources/neutral-avatar.jpg")}
                                style={styles.profileImage}
                            />
                            </TouchableOpacity>
                            {errors.profileImage && (
                                <Text style={styles.errorMessage}>{errors.profileImage}</Text>
                            )}

                            <View style={styles.wrapper}>
                                <View style={styles.inputWrapper(55, touched.name ? COLORS.primary : COLORS.offwhite)}>
                                    <TextInput
                                        placeholder= "What's your name?"
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
                                <View style={styles.inputWrapper(55, touched.age ? COLORS.primary : COLORS.offwhite)}>
                                    <TextInput
                                        placeholder='How old are you?'
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
                                <View style={styles.inputWrapper(110, touched.description ? COLORS.primary : COLORS.offwhite)}>
                                    <TextInput
                                        placeholder="Tell fellow Trotters something about yourself!"
                                        textAlignVertical="top"
                                        onFocus={() => { setFieldTouched('description') }}
                                        onBlur={() => { setFieldTouched('description', '') }}
                                        value={values.description}
                                        onChangeText={handleChange('description')}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        style={{flex: 1}}
                                        multiline
                                    />
                                </View>
                                {touched.description && errors.description && (
                                    <Text style={styles.errorMessage}>{errors.description}</Text>
                                )}
                            </View>

                            <View style={styles.button}>
                            <Button onPress = {()=>{navigation.navigate("SignUpLocation"), {data: values, image: profileImage}}}title="Continue" isValid={isValid} loader={loader} color={COLORS.primary} colorText={COLORS.white}/>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </SafeAreaView>
        </ScrollView>
    );
};

export default SignUp;