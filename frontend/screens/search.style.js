import { StyleSheet } from "react-native";
import {COLORS, SIZES, SHADOWS} from "../resources/index";

const styles = StyleSheet.create({
  safeContainer: {
      flex: 1,
      backgroundColor: '#fff',
  },
  container: {
      flex: 1,
      padding: 20,
  },
  searchBar: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      paddingLeft: 10,
      borderRadius: 5,
      marginBottom: 10,
  },
  flatList: {
      position: 'absolute',
      top: 60,
      width: '100%',
      zIndex: 1,
      backgroundColor: 'white',
  },
  item: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
  },
  userContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 10,
  },
  userCard: {
      width: '48%',
      height: 250,
      backgroundColor: '#f9f9f9',
      borderRadius: 20,
      marginBottom: 10,
      overflow: 'hidden',
  },
  userInfo: {
      position: 'absolute',
      zIndex: 2,
      //backgroundColor: 'rgba(0, 0, 0, 0.5)',
      width: '100%',
      padding: 10,
      bottom: 0
  },
  userName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
  },
  userAge: {
      fontSize: 14,
      color: 'white',
  },
  profileImage: {
      width: '100%',
      height: '100%',
      position: 'absolute',
  },
});

export default styles;