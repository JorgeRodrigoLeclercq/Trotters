import { View, 
    Text, 
    TextInput, 
    ScrollView, 
    Image, 
    TouchableOpacity,
    Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./signIn.style";
import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons"
import { COLORS, SHADOWS, SIZES } from "../resources/index"
import Button from '../components/Button';
import { Formik } from 'formik';


const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Provide a valid email address")
        .required("Required"),

    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),

    location: Yup.string()
        .min(3, "Provide a valid location")
        .required("Required"),
    username: Yup.string()
        .min(3, "Provide a valid username")
        .required("Required")
});

const SignUp = () => {
    const [loader, setLoader] = useState(false);
    const [obscureText, setObscureText] = useState(false);

    const invalidForm = () => {
        Alert.alert(
            "Invalid Form",
            "Please provide all required fields",
            [
                {
                    text: "Cancel", onPress: () => console.log("Error")
                },
                {
                    text: "Continue", onPress: () => {}
                },
                {defaultIndex : 1}
            ]
        )
    }
    return(
        <ScrollView>
            <SafeAreaView style={{marginHorizontal:20}}>
                <View>
                    <Image
                    source={require("../resources/pfp.png")}
                    style={styles.cover}
                    />

                    <Text style={styles.title}> LOG IN </Text>
                    <Formik
                    initialValues={{email: '', password: '', location: '', username: ''}}
                    validationSchema={validationSchema}
                    onSubmit={(values)=>console.log(values)}
                    >
                    {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched }) => (
                    <View>
                        <View
                            style={styles.wrapper}
                        >
                            <Text style={styles.label}>Username</Text>
                            <View style={styles.inputWrapper(touched.username ? COLORS.primary : COLORS.offwhite)}>
                                <MaterialCommunityIcons
                                    name='face-man-pofile'
                                    size={20}
                                    color={COLORS.gray}
                                    style={styles.iconStyle}
                                />
                                <TextInput
                                    placeholder='Enter username'
                                    onFocus={()=>{setFieldTouched('username')}}
                                    onBlur={()=>{setFieldTouched('username', '')}}
                                    value={values.username}
                                    onChangeText={handleChange('username')}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={{flex:1}}
                                />
                            </View>
                            {touched.username && errors.username && (
                                <Text style={styles.errorMessage}>{errors.username}</Text>
                            )}
                        </View>
                        <View
                            style={styles.wrapper}
                        >
                            <Text style={styles.label}>Email</Text>
                            <View style={styles.inputWrapper(touched.email ? COLORS.primary : COLORS.offwhite)}>
                                <MaterialCommunityIcons
                                    name='email-outline'
                                    size={20}
                                    color={COLORS.gray}
                                    style={styles.iconStyle}
                                />
                                <TextInput
                                    placeholder='Enter email'
                                    onFocus={()=>{setFieldTouched('email')}}
                                    onBlur={()=>{setFieldTouched('email', '')}}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={{flex:1}}
                                />
                            </View>
                            {touched.email && errors.email && (
                                <Text style={styles.errorMessage}>{errors.email}</Text>
                            )}
                        </View>

                        <View
                            style={styles.wrapper}
                        >
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.inputWrapper(touched.password ? COLORS.primary : COLORS.offwhite)}>
                                <MaterialCommunityIcons
                                    name='lock-outline'
                                    size={20}
                                    color={COLORS.gray}
                                    style={styles.iconStyle}
                                />
                                <TextInput
                                    secureTextEntry={obscureText}
                                    placeholder='Enter password'
                                    onFocus={()=>{setFieldTouched('password')}}
                                    onBlur={()=>{setFieldTouched('password', '')}}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={{flex:1}}
                                />
                                <TouchableOpacity onPress={()=>{setObscureText(!obscureText)}}>
                                    <MaterialCommunityIcons
                                    name={obscureText?"eye-outline":"eye-off-outline"}
                                    size={18}
                                    />
                                </TouchableOpacity>
                            </View>
                            {touched.password && errors.password && (
                                <Text style={styles.errorMessage}>{errors.password}</Text>
                            )}
                        </View>

                        <View
                            style={styles.wrapper}
                        >
                            <Text style={styles.label}>Location</Text>
                            <View style={styles.inputWrapper(touched.location ? COLORS.primary : COLORS.offwhite)}>
                                <Ionicons
                                    name='location-outline'
                                    size={20}
                                    color={COLORS.gray}
                                    style={styles.iconStyle}
                                />
                                <TextInput
                                    placeholder='Enter location'
                                    onFocus={()=>{setFieldTouched('location')}}
                                    onBlur={()=>{setFieldTouched('location', '')}}
                                    value={values.location}
                                    onChangeText={handleChange('location')}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    style={{flex:1}}
                                />
                            </View>
                            {touched.location && errors.location && (
                                <Text style={styles.errorMessage}>{errors.location}</Text>
                            )}
                        </View>
                        <Button onPress={isValid?handleSubmit:invalidForm} title="R E G I S T E R" isValid={isValid} />
                        <Text style={styles.registration} onPress={()=>{navigation.navigate("SignUp")}}>Register</Text>
                    </View>
                    )}

                    </Formik>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default SignUp;