import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, TextInput, FlatList, Text, ActivityIndicator, SafeAreaView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from "./messages.style";
import { COLORS } from "../resources";
import { StatusBar } from "react-native";

const Messages = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const userData = await AsyncStorage.getItem('testingTrotters1info');
      const parsedUserData = JSON.parse(userData);
      const userId = parsedUserData._id;
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
  };

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
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.black} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error fetching data: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: StatusBar.currentHeight, backgroundColor: COLORS.primary}}></View>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={COLORS.gray} style={styles.searchIcon} />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      {/* Conversations List */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItem} onPress={() => navigation.navigate("Chat", { userId: item.id, userName: item.name })}>
            <Image source={{ uri: item.image }} style={styles.profileImage} />
            <View style={styles.textContainer}>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.messageText} numberOfLines={1}>Holaaa</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Messages;

