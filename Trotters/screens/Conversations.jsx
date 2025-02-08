import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import removeAccents from 'remove-accents';  
import styles from './conversations.style';
import { COLORS } from '../resources';

const Conversations = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);
  const [queryConversations, setQueryConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Retrieve user's current conversations
  const fetchConversations = async () => {
    try {
      const userData = await AsyncStorage.getItem('trottersApp');
      const parsedUserData = JSON.parse(userData);
      const userId = parsedUserData._id;

      const response = await axios.get(`https://api.wearetrotters.com/messaging/getConversations/${userId}`);

      if (response.status === 200) { // if the user has at least 1 conversation
        const fetchedConversations = response.data;

        // Sort the conversations based on the time of the last message
        const sortedConversations = fetchedConversations
          .map((conversation) => {
            if (conversation.lastMessage.senderId === userId) {
              conversation.lastMessage.content = `You: ${conversation.lastMessage.content}`; // add a 'You: ' in case the last message is from the user
            }
            if (conversation.lastMessage.content.length > 33) {
              conversation.lastMessage.content = conversation.lastMessage.content.substring(0, 33) + '...'; // truncate in case the last message is too large
            }            
            return conversation;
          })
          .sort((a, b) => new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt)); // sorting based on the time of the last message

        setConversations(sortedConversations);
        setQueryConversations(sortedConversations);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch conversations.');
    }
  };

  // Update every time the screen is mounted
  useFocusEffect(
    useCallback(() => {
      fetchConversations();
    }, [])
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    const normalizedQuery = removeAccents(query.toLowerCase());  
    if (normalizedQuery.trim() === '') {
      setQueryConversations(conversations);  
    } else {
      const filteredData = conversations.filter(item =>
        removeAccents(item.name.toLowerCase()).includes(normalizedQuery)
      );
      setQueryConversations(filteredData);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder='Who do you want to talk to?'
          placeholderTextColor={COLORS.gray}
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchBar}
        />
      </View>

      {queryConversations.length != 0 ? (
        <FlatList
          data={queryConversations}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => navigation.navigate('Chat',
                { otherUserId: item._id, 
                  otherUserName: item.name, 
                  otherUserProfileImage: item.profileImage 
                })}
              style={styles.conversationContainer}>
              <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
                <View style={styles.recipientAndLastMessageContainer}>
                  <Text style={styles.recipient}>{item.name}</Text>
                  <Text numberOfLines={1} style={styles.lastMessage}>{item.lastMessage.content}</Text>
                </View>
            </TouchableOpacity>
          )}
          style={styles.flatList}
        />
      ) : (
        <View>
        </View>
      )}
    </View>
  );
};

export default Conversations;