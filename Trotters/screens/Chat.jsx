import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, KeyboardAvoidingView, Alert } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io } from 'socket.io-client';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './chat.style';
import { COLORS } from '../resources';

const Chat = ({ route, navigation }) => {
    const { otherUserId, otherUserName, otherUserProfileImage } = route.params;
    const [currentUserId, setCurrentUserId] = useState('');
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const socketRef = useRef({});
    const scrollViewRef = useRef({});

    useEffect(() => {
        // Initialize a socket connection and retrieve the conversation's messages
        const initializeChat = async () => {
            try {
                const userData = await AsyncStorage.getItem('trottersApp');
                const parsedUserData = JSON.parse(userData);
                setCurrentUserId(parsedUserData._id);

                // Initialize a socket connection
                const socketConnection = io('https://api.wearetrotters.com', {
                    query: { userId: parsedUserData._id }
                });

                socketRef.current = socketConnection; 

                // Retrieve the conversation's messages
                const response = await axios.get('https://api.wearetrotters.com/messaging/getMessages', {
                    params: {
                        currentUserId: parsedUserData._id,
                        otherUserId
                    }
                });

                setMessages(response.data);

                // Add incoming messages to the chat
                socketConnection.on('message', (message) => {
                    setMessages((prevMessages) => [...prevMessages, message]);
                });
            } catch (error) {
                Alert.alert('Error', 'Failed to build the chat.');
            }
        };

        initializeChat();

        return () => {
            if (socketRef.current) {
                socketRef.current.off('message');
                socketRef.current.disconnect();
            }
        };
    }, []); 

    // Scroll to the bottom whenever a message from the user is added
    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.senderId === currentUserId) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const sendMessage = async () => {
        if (inputText.trim()) {
            let newMessage = {
                content: inputText,
                senderId: currentUserId,
                receiverId: otherUserId
            };

            try {
                // Post the message in the backend
                const response = await axios.post('https://api.wearetrotters.com/messaging/sendMessage', newMessage);

                if (response.status === 201) {
                    newMessage = { ...newMessage, _id: response.data._id };

                    // Send the message through the socket
                    if (socketRef.current) {
                        socketRef.current.emit('send message', JSON.stringify({
                            to: otherUserId,
                            message: newMessage
                        }));
                    }

                    // Add outgoing messages to the chat
                    setMessages([...messages, newMessage]);
                    setInputText('');
                }
            } catch (error) {
                Alert.alert('Error', error.message);
            }
        }
    };

    return (
        <KeyboardAvoidingView behavior={'height'} style={styles.container}>
            <View style={styles.header}>
                <Ionicons
                    name={'caret-back'}
                    size={30}
                    color={COLORS.gray}
                    onPress={() => navigation.navigate('BottomNavigation')}
                />
                <Image source={{ uri: otherUserProfileImage }} style={styles.profileImage} />
                <Text style={styles.name}>{otherUserName}</Text>
            </View>

            <ScrollView 
                ref={scrollViewRef}
                style={styles.messagesContainer}
            >
                {messages.map((message) => (
                    <View
                        key={message._id}
                        style={[styles.messageWrapper, message.senderId === currentUserId ? styles.currentMessage : styles.otherMessage]}>
                        <Text style={styles.message}>{message.content}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='What do you want to say?'
                    placeholderTextColor={COLORS.gray}
                    value={inputText}
                    onChangeText={setInputText}
                    style={styles.input}
                />
                <TouchableOpacity onPress={sendMessage} style={styles.sendButtonContainer}>
                    <Ionicons
                        name='paper-plane'
                        size={30}
                        color={COLORS.gray}
                    />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Chat;