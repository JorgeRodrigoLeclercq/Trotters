import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import styles from "./chat.style";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useState, useEffect } from "react";
import { socket } from "../hook/socket";


const Chat = ({route, navigation}) => {

        const { userId, userName } = route.params;
        const [currentUserId, setCurrentUserId] = useState(null);
        const [messages, setMessages] = useState([]);
        const [inputText, setInputText] = useState('');

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
                    const response = await axios.get('http://192.168.1.97:3000/api/chat/getMessages', {
                        params: { userId, currentUserId }
                    });
                    setMessages(response.data);
                } catch (error) {
                    console.error('Error fetching messages:', error);
                }
            };
    
            fetchMessages();
    
            if (socket.connected) {
                onConnect();
            }
    
            function onConnect() {
                socket.emit("tamos on?");
            }
        }, [userId, currentUserId]);
        
        const sendMessage = () => {
          if (inputText.trim()) {
              const newMessage = {
                  id: messages.length + 1,
                  text: inputText,
                  isUser: true,
                  sender: currentUserId,
                  receiver: userId,
                  sendAt: new Date().toISOString()
              };
  
              socket.emit('send message', newMessage);
              setMessages([...messages, newMessage]);
              setInputText('');
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

// import { View, Text, SafeAreaView, Image, TextInput } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import styles from "./chat.style";
// import { useState, useEffect } from "react";


// const Chat = ({navigation}) => {

//     const [message, setMessage] = useState("");

//     return(
//         <SafeAreaView style={{flex: 1}}>
//             <View style={styles.topContainer}>
//                 <Ionicons name={"arrow-back"} size={40} onPress={() => navigation.navigate("Messages")}/>
//                 <Image style={styles.pfp} source={require('../resources/pfp.png')}/>
//                 <Text style={styles.receiver}>Alexis</Text>
//             </View>

//             <TextInput
//                 style={styles.input}
//                 value={message}
//                 onChangeText={setMessage}
//             />

//         </SafeAreaView>
//     )
// }

// export default Chat;