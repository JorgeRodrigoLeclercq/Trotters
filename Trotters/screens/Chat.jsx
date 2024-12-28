import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './chat.style';
import { COLORS } from '../resources';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSocket } from '../SocketContext'; 

const Chat = ({ route, navigation }) => {
    const { otherUserId, otherUserName, otherUserProfileImage } = route.params;
    const [currentUserId, setCurrentUserId] = useState('');
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const socket = useSocket(); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUser = await AsyncStorage.getItem('trottersApp');
                const parsedCurrentUser = JSON.parse(currentUser);
                setCurrentUserId(parsedCurrentUser._id);

                const response = await axios.get('http://192.168.0.22:3000/api/messaging/getMessages', {
                    params: { 
                        currentUserId: parsedCurrentUser._id, 
                        otherUserId 
                    }
                });

                setMessages(response.data);
            } catch (error) {
                console.error('Error', 'Failed to fetch messages.');
            }
        };
    
        fetchData();

        // if (socket && socket.connected) {
        //     onConnect();
        // }

        // function onConnect() {
        //     socket.emit('tamos on?');
        // }

        // socket.on('message', (message) => {
        //     setMessages(prevMessages => [...prevMessages, message]);
        // });

        // return () => {
        //     if (socket) {
        //         socket.off('message');
        //     }
        // };
    }, []);

    const sendMessage = async () => {
        if (inputText.trim()) {
            let newMessage = {
                content: inputText,
                senderId: currentUserId,
                receiverId: otherUserId
            };

            try {
                const response = await axios.post('http://192.168.0.22:3000/api/messaging/sendMessage', {
                    ...newMessage
                });
                
                if (response.status === 201) {
                    newMessage = { 
                        ...newMessage,
                        _id: response.data._id
                    }
                }

                socket.emit('send message', JSON.stringify({
                    to: otherUserId,
                    message: newMessage
                }));

                setMessages([...messages, newMessage]);
                setInputText('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <View style={styles.header}>
                <Ionicons 
                    name={'caret-back'} 
                    size={30} 
                    color={COLORS.gray}
                    onPress={() => navigation.navigate('BottomNavigation')} />
                <Image source={{ uri: otherUserProfileImage }} style={styles.profileImage} />
                <Text style={styles.name}>{otherUserName}</Text>
            </View>

            <ScrollView style={styles.messagesContainer}>
                {messages.map((message) => (
                    <View 
                        key={message._id} 
                        style={[styles.messageWrapper, message.senderId == currentUserId ? styles.currentMessage : styles.otherMessage]}>
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
                <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                    <Ionicons 
                        name='paper-plane' 
                        size={30}
                        color={COLORS.gray}/>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

export default Chat;
