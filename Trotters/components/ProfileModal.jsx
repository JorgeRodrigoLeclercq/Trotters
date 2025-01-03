import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../resources';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileModal = ({ user, interests, onClose, navigation }) => {
    const getRandomColor = () => {
        const colorList = ['#3B00E6', '#E601D6', '#00E5C3', '#DCE600', '#E67200'];
        const randomIndex = Math.floor(Math.random() * colorList.length);
        return colorList[randomIndex];
    };

    const sortedInterests = [
        ...user.interests.filter((interest) => interests.includes(interest)),
        ...user.interests.filter((interest) => !interests.includes(interest)),
    ];

    return (
        <View style={styles.container}>
            <View style={styles.user}>
                <View style={styles.userData}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.location}>{user.location}</Text>
                </View>

                <Image 
                    source={{ uri: user.profileImage }}
                    style={styles.profileImage}
                />
            </View>
            <ScrollView contentContainerStyle={styles.dataContainer}>
                <View style={styles.attribute}>
                    <Text style={styles.tag}>Age</Text>
                    <Text style={styles.data}>{user.age}</Text>
                </View>

                <View style={styles.attribute}>
                    <Text style={styles.tag}>Interests</Text>
                    <View style={styles.interests}>
                        {sortedInterests.map((interest, index) => {
                            const randomColor = interests.includes(interest)
                                ? getRandomColor()
                                : COLORS.gray;

                            return (
                                <View key={index} style={[styles.interestContainer, { borderColor: randomColor }]}>
                                    <View style={[styles.circle, { backgroundColor: randomColor }]} />
                                    <Text style={styles.interest}>{interest}</Text>
                                </View>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.attribute}>
                    <Text style={styles.tag}>About Me</Text>
                    <Text style={styles.data}>{user.description}</Text>
                </View>
            </ScrollView>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    onPress={onClose}
                    style={styles.closeWrapper}
                >
                    <Ionicons
                        name='caret-back'
                        size={60}
                        color={COLORS.white}
                        marginRight={"10%"}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Chat', 
                        { otherUserId: user._id, 
                          otherUserName: user.name, 
                          otherUserProfileImage: user.profileImage 
                        }
                    )}
                    style={styles.chatWrapper}
                >
                    <Ionicons
                        name='chatbubbles'
                        size={SIZES.xxLarge}
                        color={COLORS.white}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: '90%',
        borderRadius: 25,
        backgroundColor: COLORS.white
    },
    user: {
        height: '40%'
    },
    userData: {
        position: 'absolute',
        marginLeft: "2.5%",
        bottom: 0,
        zIndex: 2
    },
    name: {
        fontFamily: 'Poppins-Bold',
        fontSize: SIZES.large,
        color: COLORS.white
    },
    location: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: SIZES.medium,
        color: COLORS.white
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25
    },
    dataContainer: {
        flexGrow: 1, 
        paddingBottom: 100
    },
    attribute: {
        marginHorizontal: "2.5%",
        marginVertical: "2.5%"
    },
    tag: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: SIZES.small,
        color: COLORS.black
    },
    data: {
        fontFamily: 'Poppins-Regular',
        fontSize: SIZES.medium,
        color: COLORS.black
    },
    interests: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    interestContainer: {
        justifyContent: 'center',
        alignItems: 'center',  
        flexDirection: 'row',  
        paddingHorizontal: 10,
        borderRadius: 25,  
        borderWidth: 2,  
        margin: 2
    },
    circle: {
        width: 10,  
        height: 10,
        borderRadius: 25,  
        marginRight: 5
    },
    interest: {
        fontFamily: 'Poppins-Regular',
        fontSize: SIZES.medium,
        color: COLORS.black
    },
    buttonsContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0    
    },
    closeWrapper: {
        width: 75,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: "10%",
        marginVertical: "5%",
        borderRadius: 50,
        backgroundColor: COLORS.secondary
    },
    chatWrapper: {
        width: 75,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: "10%",
        marginVertical: "5%",
        borderRadius: 50,
        backgroundColor: COLORS.primary
    }
});

export default ProfileModal;
