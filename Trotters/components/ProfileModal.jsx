import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import styles from './profileModal.style';
import { COLORS, SIZES } from '../resources';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileModal = ({ user, interests, onClose, navigation }) => {
    const getRandomColor = () => {
        const randomIndex = Math.floor(Math.random() * COLORS.interestsColors.length);

        return COLORS.interestsColors[randomIndex];
    };

    // Sort interests based on if they share them
    const sortedInterests = [
        ...user.interests.filter((interest) => interests.includes(interest)),
        ...user.interests.filter((interest) => !interests.includes(interest)),
    ];

    return (
        <View style={styles.container}>
            <View style={styles.upperDataContainer}>
                <View style={styles.nameAndLocationContainer}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.location}>{user.location}</Text>
                </View>

                <Image 
                    source={{ uri: user.profileImage }}
                    style={styles.profileImage}
                />
            </View>

            <ScrollView contentContainerStyle={styles.dataContainer}>
                <View style={styles.keyValueContainer}>
                    <Text style={styles.key}>Age</Text>
                    <Text style={styles.value}>{user.age}</Text>
                </View>

                <View style={styles.keyValueContainer}>
                    <Text style={styles.key}>Interests</Text>
                    <View style={styles.interestsContainer}>
                        {sortedInterests.map((interest, index) => {
                            const randomColor = interests.includes(interest) ? getRandomColor() : COLORS.gray;

                            return (
                                <View key={index} style={[styles.interestWrapper, { borderColor: randomColor }]}>
                                    <View style={[styles.circle, { backgroundColor: randomColor }]} />
                                    <Text style={styles.interest}>{interest}</Text>
                                </View>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.keyValueContainer}>
                    <Text style={styles.key}>About Me</Text>
                    <Text style={styles.value}>{user.description}</Text>
                </View>
            </ScrollView>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    onPress={onClose}
                    style={styles.closeButtonWrapper}
                >
                    <Ionicons
                        name='caret-back'
                        size={60}
                        color={COLORS.white}
                        marginRight={'10%'}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Chat', 
                        { otherUserId: user._id, 
                          otherUserName: user.name, 
                          otherUserProfileImage: user.profileImage 
                        }
                    )}
                    style={styles.chatButtonWrapper}
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

export default ProfileModal;