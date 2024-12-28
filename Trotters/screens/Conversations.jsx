import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import removeAccents from 'remove-accents';  
import styles from './conversations.style';
import { COLORS } from '../resources';

const Conversations = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);
  const [queryConversations, setQueryConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const userData = await AsyncStorage.getItem('trottersApp');
        const parsedUserData = JSON.parse(userData);
        const userId = parsedUserData._id;
  
        const response = await axios.get(`http://192.168.0.22:3000/api/messaging/getConversations/${userId}`);
        
        if (response.status == 200) {
          const fetchedConversations = response.data;
  
          const sortedConversations = fetchedConversations
            .map(conversation => {
              if (conversation.lastMessage.senderId === userId) {
                conversation.lastMessage.content = `You: ${conversation.lastMessage.content}`;
              }
              return conversation;
            })
            .sort((a, b) => new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt));
    
          setConversations(sortedConversations);
          setQueryConversations(sortedConversations);
        }

      } catch (error) {
        Alert.alert('Error', 'Failed to fetch conversations.');
      }
    };

    fetchConversations();
  }, []);

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
      <View style={styles.searchContainer}>
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
                <View style={styles.recipientAndLastMessage}>
                  <Text style={styles.recipient}>{item.name}</Text>
                  <Text numberOfLines={1} style={styles.lastMessage}>{item.lastMessage.content}</Text>
                </View>
            </TouchableOpacity>
          )}
          style={styles.listWrapper}
        />
      ) : 
      (<View>
      </View>)}
    </View>
  );
};

export default Conversations;