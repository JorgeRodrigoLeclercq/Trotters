import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import styles from "./chat.style";
import { useState, useEffect } from "react";
import { socket } from "../hook/socket";


const Chat = ({route, navigation}) => {

        const { userId, userName } = route.params;

        const [messages, setMessages] = useState([
            { id: 1, text: 'Hello!', isUser: false },
            { id: 2, text: 'Hi! How are you?', isUser: true }
          ]);
        const [inputText, setInputText] = useState('');

        useEffect(() => {
          if (socket.connected){
            onConnect();
          }
          function onConnect(){
            socket.emit("tamos on?");
          }
        }, [])
        
          const sendMessage = () => {
            if (inputText.trim()) {
              const newMessage = {
                id: messages.length + 1,
                text: inputText,
                isUser: true
              };
              
              socket.emit('send message', newMessage);
              setMessages([...messages, newMessage]);
              setInputText('');
            }
          };
        
          return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
              <View style={styles.header}>
                <Ionicons name={"arrow-back"} size={40} onPress={()=>navigation.navigate("Messages")}/>
                <Image source={{ uri: 'https://placekitten.com/200/200' }} style={styles.profilePic} />
                <Text style={styles.userName}>{userName}</Text>
              </View>
              <ScrollView style={styles.messagesContainer}>
                {messages.map((msg) => (
                  <View key={msg.id} style={[styles.message, msg.isUser ? styles.userMessage : styles.otherMessage]}>
                    <Text>{msg.text}</Text>
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