import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import Button from './Button';

const ProfileModal = ({ user, onClose, navigation }) => {
    if (!user) return null;

    const windowHeight = Dimensions.get('window').height * 0.9; // 90% of the window height

    return (
        <View style={[styles.modalContainer, { height: windowHeight }]}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.top}>
                    <Image style={styles.pfp} source={require('../resources/pfp.png')} />
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.nationality}>{user.nationality}</Text>
                </View>

                <View style={styles.blankSpace}></View>

                <View style={styles.attribute}>
                    <Text style={styles.tag}>Age</Text>
                    <View style={styles.line}></View>
                    <Text style={styles.info}>{user.age}</Text>
                </View>

                <View style={styles.blankSpace}></View>

                <View style={styles.attribute}>
                    <Text style={styles.tag}>Interests</Text>
                    <View style={styles.line}></View>
                    <Text style={styles.info}>{user.interests}</Text>
                </View>

                <View style={styles.blankSpace}></View>

                <View style={styles.attribute}>
                    <Text style={styles.tag}>About Me</Text>
                    <View style={styles.line}></View>
                    <Text style={styles.info}>{user.description}</Text>
                </View>

                <Button title="Close" onPress={() => navigation.navigate("Chat", { userId: user._id, userName: user.name })} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    top: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pfp: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    nationality: {
        fontSize: 18,
        color: 'gray',
    },
    blankSpace: {
        height: 20,
    },
    attribute: {
        width: '100%',
        paddingHorizontal: 20,
    },
    tag: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    line: {
        height: 1,
        backgroundColor: 'gray',
        marginVertical: 5,
    },
    info: {
        fontSize: 16,
    },
});

export default ProfileModal;
