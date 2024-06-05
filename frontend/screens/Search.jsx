import React from 'react';
import styles from "./search.style";
import { TouchableOpacity, View, TextInput, FlatList, Text, ActivityIndicator, SafeAreaView, Image } from "react-native";
import {Ionicons} from "@expo/vector-icons";
import { useState, useEffect } from 'react';
import { COLORS } from '../resources';
import axios from "axios";


//const API_ENDPOINT = "../resources/locations.json";

const Search = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetchData();
  }, [])

  const fetchData = async(url) => {
    const nationalities = require("../resources/locations.json");
    const transformedData = Object.keys(nationalities).map(key => ({
      country: key,
      city: nationalities[key]
    }));
    setData(transformedData);
    setFullData(transformedData);
    setIsLoading(false);
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setData(fullData);  // If the search query is empty, restore the full data
    } else {
      const filteredData = fullData.filter(item =>
        item.city.toLowerCase().includes(query.toLowerCase()) ||
        item.country.toLowerCase().includes(query.toLowerCase())
      );
      setData(filteredData);  // Set data to filtered results
    }
  }

  const handleSelectItem = async(item) => {
    setSelectedItem(item);
    try {
      console.log(item);
      const response = await axios.get(`http://192.168.1.97:3000/api/people/search/${item.city}, ${item.country}`);
      //console.log(response);
      console.log("=================");
      console.log(response.data);
      console.log("=================");
      } catch (error) {
          console.log("Failed to get the products", error);
      } 
  };

  if (isLoading) {
    return(
      <View style={{flex: 1, justifyContent: "center", alignContent: "center"}}>
        <ActivityIndicator size={"large"} color={COLORS.black}/>
      </View>
    );
  }

  if (error) {
    return(<View>
      <Text>Error in fetching the data</Text>
    </View>)
  }

  if (selectedItem) {
    return (
      <View style={{backgroundColor: COLORS.lightWhite, height: "100%", justifyContent: "center", alignContent: "center"}}>
        <Image
          source={require('../resources/pfp.png')} // Replace this URL with your image URL
          style={{ width: 200, height: 200, borderRadius: 100 }}
          //resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.containerGPT}>
      <TextInput
        placeholder="Search"
        clearButtonMode="always"
        style={styles.searchBoxGPT}
        autoCapitalize="none"
        //autoCorrect="false"
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}
      />
      <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}  // Use index as key extractor
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => handleSelectItem(item)}>
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>{item.city}, {item.country}</Text>
            </View>
        </TouchableOpacity>
      )}
      />
         
    </SafeAreaView>
  );
};

export default Search;