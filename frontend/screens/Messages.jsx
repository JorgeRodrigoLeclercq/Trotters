import React from 'react';
import styles from "./messages.style";
import { TouchableOpacity, View, TextInput, FlatList, Text, ActivityIndicator, SafeAreaView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { COLORS } from "../resources";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Messages = ({navigation}) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, [])


  const fetchData = async() => {
    setIsLoading(true);
    try {
      const userData = await AsyncStorage.getItem('testingTrotters1info');
      const parsedUserData = JSON.parse(userData);
      const userId = parsedUserData._id
      if (!userId) {
        setError('User ID not found in AsyncStorage');
        setIsLoading(false);
        return;
      }
      const response = await axios.get('http://192.168.0.20:3000/api/chat/getConversations', {
        params: { userId }
      });
      setData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      fetchData();  // Re-fetch full data if search query is empty
    } else {
      const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setData(filteredData);  // Set data to filtered results
    }
  }

  if (isLoading) {
    return(
      <View style={{flex: 1, justifyContent: "center", alignContent: "center"}}>
        <ActivityIndicator size={"large"} color={COLORS.black}/>
      </View>
    );
  }

  if (error) {
    return(<View>
      <Text>Error in fetching the data: {error}</Text>
    </View>)
  }

  return (
    <SafeAreaView style={styles.containerGPT}>
      <TextInput
        placeholder="Search"
        clearButtonMode="always"
        style={styles.searchBoxGPT}
        autoCapitalize="none"
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}  // Use id as key extractor
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate("Chat", { userId: item.id, userName: item.name })}>
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Messages;
