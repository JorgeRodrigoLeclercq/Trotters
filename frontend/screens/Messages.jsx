import { Text, View, Image, ScrollView } from "react-native";
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "./messages.style";
import { Dimensions } from 'react-native';
import { StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Messages = () => {

    let windowHeight = Dimensions.get('window').height;
    let containerHeight = (windowHeight + StatusBar.currentHeight) - 70;

    return (
        <View style={styles.container} height={containerHeight}>
                <View style={styles.top}>
                    <Image style={styles.pfp} source={require('../resources/pfp.png')}/>
                    <View style={styles.backIcon}>
                      <Ionicons name={"chatbubbles"} size={40}/>
                    </View>
                    <View style={styles.messageIcon}>
                      <Ionicons name={"arrow-back"} size={40}/>
                    </View>
                    <Text style={styles.name}>Jorge Rodrigo Leclercq</Text>
                    <Text style={styles.nationality}>Madrid, Spain</Text>
                </View>

                <View style={styles.blankSpace}></View> 

                <View style={styles.attribute}>
                    <Text style={styles.tag}>Age</Text>
                    <View style={styles.line}></View>
                    <Text style={styles.info}>21</Text>
                </View>

                <View style={styles.blankSpace}></View> 

                <View style={styles.attribute}>
                    <Text style={styles.tag}>Interests</Text>
                    <View style={styles.line}></View>
                    <Text style={styles.info}>Music||Boxing||Peepee poopoo</Text>
                </View>

                <View style={styles.blankSpace}></View> 

                <View style={styles.attribute}>
                    <Text style={styles.tag}>About Me</Text>
                    <View style={styles.line}></View>
                    <Text style={styles.info}>Hello! I'm a young traveler who loves music and 
                    wants to meet new people :D My favourite groups are Nirvana, Artic Monkeys
                    and Gorillaz</Text>
                </View>

                <View style={styles.blankSpace}></View>
        </View>
    )
}

export default Messages;



