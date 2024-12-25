import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, Alert } from "react-native";
import { useState, useEffect } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import styles from "./signUp.style";
import { COLORS } from "../resources/index";
import Button from '../components/Button';

const SignUp = ({ route, navigation }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [signUpData, setSignUpData] = useState({
        email: route.params.email,
        name: '',
        age: '',
        description: '',
        profileImage: null
    });
    const [isValid, setIsValid] = useState(false);
    const [focusedField, setFocusedField] = useState('');

    useEffect(() => {
        setSignUpData(prevData => ({
            ...prevData,
            name,
            age,
            description,
            profileImage
        }));

        if ((typeof name === 'string' && name.trim().length > 0) &&
            (/^\d+$/.test(age)) &&
            (typeof description === 'string' && description.trim().length > 0) &&
            (profileImage)) {
            setIsValid(true);

        } else {
            setIsValid(false);
        }
    }, [name, age, description, profileImage]);

    const handleImageSelection = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
        });

        if (result.assets && result.assets[0].uri) {
            const image = result.assets[0];
            const imageType = image.type.split('/')[1];
            const validExtensions = ['jpg', 'jpeg', 'png'];

            if (validExtensions.includes(imageType)) {
                setImageUri(image.uri); 

                // Save as a String with encoded information
                try {
                    const binaryData = await RNFS.readFile(image.uri.replace('file://', ''), 'base64');
                    setProfileImage(`data:${image.type};base64,${binaryData}`);
                } catch (error) {
                    Alert.alert('Error reading the file', error);
                }

            } else {
                Alert.alert("Invalid file type", "Please select a JPG, JPEG, or PNG image.");
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.scrollViewWrapper}>
                <ScrollView
                    contentContainerStyle={styles.valuesScroll}
                    keyboardShouldPersistTaps="handled"
                >
                    <TouchableOpacity
                        onPress={() => handleImageSelection()}
                        style={styles.imageWrapper}
                    >
                        <Image
                            source={imageUri ? { uri: imageUri } : require("../resources/neutral-avatar.jpg")}
                            style={styles.profileImage}
                        />
                    </TouchableOpacity>

                    <View style={styles.wrapper}>
                        {/* <View style={{alignItems: "flex-end"}}>
                            <Text style={{fontFamily: "Poppins-Bold", paddingRight: 10}}>
                                Name
                            </Text>
                        </View> */}
                        <View style={styles.inputWrapper(55, focusedField === "name" ? COLORS.primary : COLORS.white)}>
                            <TextInput
                                placeholder="What's your name?"
                                onFocus={() => setFocusedField("name")}
                                onBlur={() => setFocusedField(null)}
                                value={name}
                                onChangeText={setName}
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={{ flex: 1 }}
                            />
                        </View>
                    </View>

                    <View style={styles.wrapper}>
                        {/* <View style={{alignItems: "flex-end"}}>
                            <Text style={{fontFamily: "Poppins-Bold", paddingRight: 10}}>
                                Age
                            </Text>
                        </View> */}
                        <View style={styles.inputWrapper(55, focusedField === "age" ? COLORS.primary : COLORS.white)}>
                            <TextInput
                                placeholder="How old are you?"
                                onFocus={() => setFocusedField("age")}
                                onBlur={() => setFocusedField(null)}
                                value={age}
                                onChangeText={setAge}
                                keyboardType="numeric"
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={{ flex: 1 }}
                            />
                        </View>
                    </View>

                    <View style={styles.wrapper}>
                        {/* <View style={{alignItems: "flex-end"}}>
                            <Text style={{fontFamily: "Poppins-Bold", paddingRight: 10}}>
                                Description
                            </Text>
                        </View> */}
                        <View style={styles.inputWrapper(110, focusedField === "description" ? COLORS.primary : COLORS.white)}>
                            <TextInput
                                placeholder="Tell fellow Trotters something about yourself!"
                                onFocus={() => setFocusedField("description")}
                                onBlur={() => setFocusedField(null)}
                                value={description}
                                onChangeText={setDescription}
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={{ flex: 1 }}
                                textAlignVertical="top"
                                multiline
                            />
                        </View>
                    </View>

                    {/* <View style={{justifyContent: "center", alignItems: "center"}}>
                        <Image source={require("../resources/signUp-grass.jpg")}
                            style={{}}/>
                    </View> */}
                </ScrollView>
            </View>

            <View style={styles.button}>
                <Button
                    title="Continue"
                    onPress={() => {
                        navigation.navigate("SignUpLocation", {
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

export default SignUp;