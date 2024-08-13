import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import styles from "./chat.style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useState, useEffect } from "react";
import { useSocket } from '../SocketContext'; // Import the useSocket hook

const Chat = ({ route, navigation }) => {
    const { userId, userName } = route.params;
    const [currentUserId, setCurrentUserId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const socket = useSocket(); // Use the socket from context

    useEffect(() => {
        // Fetch the current user's ID from AsyncStorage
        const fetchCurrentUserId = async () => {
            const userData = await AsyncStorage.getItem('testingTrotters1info');
            const parsedUserData = JSON.parse(userData);
            setCurrentUserId(parsedUserData._id);
        };

        fetchCurrentUserId();

        // Fetch messages from the backend
        const fetchMessages = async () => {
            try {
                const response = await axios.get('http://192.168.1.38:3000/api/chat/getMessages', {
                    params: { userId, currentUserId }
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();

        if (socket && socket.connected) {
            onConnect();
        }

        function onConnect() {
            socket.emit("tamos on?");
        }

        socket.on("message", (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        // Cleanup the effect
        return () => {
            if (socket) {
                socket.off("message");
            }
        };
    }, [userId, currentUserId, socket]);

    const sendMessage = async () => {
        if (inputText.trim()) {
            const newMessage = {
                content: inputText,
                sender: currentUserId,
                receiver: userId,
                sendAt: new Date().toISOString()
            };

            try {
                // Post the message to the backend using axios
                await axios.post('http://192.168.1.38:3000/api/chat/sendMessage', {
                    content: inputText,
                    sender: currentUserId,
                    receiver: userId
                });

                // Emit the message via socket
                socket.emit("send message", JSON.stringify({
                    to: userId,
                    message: newMessage
                }));

                // Update the local messages state
                setMessages([...messages, newMessage]);
                setInputText('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <View style={styles.header}>
                <Ionicons name={"arrow-back"} size={40} onPress={() => navigation.navigate("Messages")} />
                <Image source={{ uri: 'https://placekitten.com/200/200' }} style={styles.profilePic} />
                <Text style={styles.userName}>{userName}</Text>
            </View>
            <ScrollView style={styles.messagesContainer}>
                {messages.map((msg) => (
                    <View key={msg._id} style={[styles.message, msg.sender == currentUserId ? styles.userMessage : styles.otherMessage]}>
                        <Text>{msg.content}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Type a message"
                />
                <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                    <Text>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

export default Chat;