import { Text, View, Image } from "react-native";
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "./profile.style";

const Profile = () => {
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Image style={styles.pfp} source={require('../resources/pfp.png')}/>
                <Text style={styles.id}>Jorge Rodrigo Leclercq</Text>
            </View>
        </View>
    )
}

export default Profile;



