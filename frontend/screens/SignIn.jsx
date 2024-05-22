import { View, Text, TextInput, Dimensions } from "react-native";
import styles from "./signIn.style";

const SignIn = ({navigation}) => {
    return(
        <View style={{height: Dimensions.get("window").height, justifyContent: "center", alignItems: "center"}}>
            <Text>Username</Text>
            <TextInput style={styles.usernameContainer}/>
            <Text>Password</Text>
            <TextInput style={styles.passwordContainer}/>
            <Text>Forgot about your password? Don't worry! Click here</Text> 
            <View style={styles.sigInContainer}>
                <Text>Sign In!</Text>
            </View>
            <Text>New to Trotters?<Text style={styles.underline} onPress={()=>navigation.navigate("SignUp")}> Sign Up here</Text></Text>
        </View>
    )
}

export default SignIn;