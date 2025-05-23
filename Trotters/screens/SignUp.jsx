import { View, TextInput, ScrollView, Image, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import RNFS from 'react-native-fs';
import styles from './signUp.style';
import { COLORS } from '../resources/index';
import Button from '../components/Button';

const SignUp = ({ route, navigation }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [imageUri, setImageUri] = useState('');
    const [signUpData, setSignUpData] = useState({
        name: '',
        age: '',
        description: '',
        profileImage: '',
       email: route.params.email
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
            (/^\d+$/.test(age)) && // age should be a number
            (typeof description === 'string' && description.trim().length > 0 && description.trim().length < 250) && // description should be less than 250 characters long
            (typeof profileImage === 'string' && profileImage.trim().length > 0)) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [name, age, description, profileImage]);

    const handleImageSelection = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });
    
        if (result.assets && result.assets[0].uri) {
            const image = result.assets[0];
            const imageType = image.type.split('/')[1];
            const validExtensions = ['jpg', 'jpeg', 'png'];

            if (validExtensions.includes(imageType)) {
                setImageUri(image.uri);
    
                try {
                    const resizedImage = await ImageResizer.createResizedImage(
                        image.uri,
                        500, 
                        500, 
                        'JPEG', 
                        80, 
                        0 
                    );
        
                    const binaryData = await RNFS.readFile(resizedImage.uri.replace('file://', ''), 'base64');
                    setProfileImage(`data:image/jpeg;base64,${binaryData}`);
                } catch (error) {
                    Alert.alert('Error resizing image', error.message);
                }
            } else {
                Alert.alert('Invalid file type', 'Please select a JPG, JPEG, or PNG image.');
            }
        }
    };    

    const invalidForm = () => {
        let error = '';
        if (!(typeof name === 'string' && name.trim().length > 0)) {
            error += 'State your name\n';
        }
        if (!(/^\d+$/.test(age))) {
            error += 'Age must be a number\n';
        }
        if (!(typeof description === 'string' && description.trim().length > 0 && description.trim().length < 250)) {
            error += 'Your description should be less than 250 characters\n';
        }
        if (!profileImage) {
            error += 'Please choose you profile picture';
        }

        Alert.alert('Invalid form', error);
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView 
                behavior='height'
                style={styles.scrollViewContainer}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollView}
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={false}
                >
                    <TouchableOpacity
                        onPress={() => handleImageSelection()}
                        style={styles.imageWrapper}
                    >
                        <Image
                            source={imageUri ? { uri: imageUri } : require('../resources/neutral-avatar.jpg')}
                            style={styles.profileImage}
                        />
                    </TouchableOpacity>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper(55, focusedField === 'name' ? COLORS.primary : COLORS.white)}>
                            <TextInput
                                placeholder="What's your name?"
                                placeholderTextColor={COLORS.gray}
                                color={COLORS.black}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                value={name}
                                onChangeText={setName}
                                autoCapitalize='none'
                                autoCorrect={false}
                                style={{ flex: 1 }}
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper(55, focusedField === 'age' ? COLORS.primary : COLORS.white)}>
                            <TextInput
                                placeholder='How old are you?'
                                placeholderTextColor={COLORS.gray}
                                color={COLORS.black}
                                onFocus={() => setFocusedField('age')}
                                onBlur={() => setFocusedField(null)}
                                value={age}
                                onChangeText={setAge}
                                keyboardType='numeric'
                                autoCapitalize='none'
                                autoCorrect={false}
                                style={{ flex: 1 }}
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputWrapper(110, focusedField === 'description' ? COLORS.primary : COLORS.white)}>
                            <TextInput
                                placeholder='Tell fellow Trotters something about yourself!'
                                placeholderTextColor={COLORS.gray}
                                color={COLORS.black}
                                onFocus={() => setFocusedField('description')}
                                onBlur={() => setFocusedField(null)}
                                value={description}
                                onChangeText={setDescription}
                                autoCapitalize='none'
                                autoCorrect={false}
                                style={{ flex: 1 }}
                                textAlignVertical='top'
                                multiline
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={styles.buttonContainer}>
                <Button
                    title='Continue'
                    onPress={isValid ? 
                        (() => {
                        navigation.navigate('SignUpLocation', {
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

export default SignUp;