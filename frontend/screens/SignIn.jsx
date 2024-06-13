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
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { COLORS, SHADOWS, SIZES } from "../resources/index"
import Button from '../components/Button';
import { Formik } from 'formik';
import axios from "axios";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Provide a valid email address")
        .required("Required"),

    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required")
});

const SignIn = ({navigation}) => {

    const [loader, setLoader] = useState(false);
    const [responseData, setResponseData] = useState(null);
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

    const login = async (values) => {
        setLoader(true)
        console.log(values);

        try {
            const endpoint = "http://192.168.1.97:3000/api/people/login";
            const data = values;

            const response = await axios.post(endpoint, data)

            if (response.status === 200){
                setLoader(false);
                setResponseData(response.data);

                await AsyncStorage.setItem(`user${responseData._id}`, JSON.stringify(responseData))

                await AsyncStorage.setItem('id', JSON.stringify(responseData._id))
            }else{
                Alert.alert(
                    "Error logging in",
                    "Please provide valid credentials",
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
        } catch (error) {
            Alert.alert(
                "Error logging in",
                "Oops",
                [
                    {
                        text: "Cancel", onPress: () => console.log(error)
                    },
                    {
                        text: "Continue", onPress: () => {}
                    },
                    {defaultIndex : 1}
                ]
            )
        }finally{
            setLoader(false);
        }
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
                    initialValues={{email: '', password: ''}}
                    validationSchema={validationSchema}
                    onSubmit={(values)=>login(values)}
                    >
                    {({ handleChange, handleBlur, touched, handleSubmit, values, errors, isValid, setFieldTouched }) => (
                    <View>
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
                        <Button onPress={isValid?handleSubmit:invalidForm} title="L O G I N" isValid={isValid} loader={loader}/>
                        <Text style={styles.registration} onPress={()=>{navigation.navigate("SignUp")}}>Register</Text>
                    </View>
                    )}

                    </Formik>
                </View>
            </SafeAreaView>
        </ScrollView>
    )

    // return(
    //     <View style={{height: Dimensions.get("window").height, justifyContent: "center", alignItems: "center"}}>
    //         <Text>Username</Text>
    //         <TextInput style={styles.usernameContainer}/>
    //         <Text>Password</Text>
    //         <TextInput style={styles.passwordContainer}/>
    //         <Text>Forgot about your password? Don't worry! Click here</Text> 
    //         <View style={styles.sigInContainer}>
    //             <Text>Sign In!</Text>
    //         </View>
    //         <Text>New to Trotters?<Text style={styles.underline} onPress={()=>navigation.navigate("SignUp")}> Sign Up here</Text></Text>
    //     </View>
    // )
}

export default SignIn;