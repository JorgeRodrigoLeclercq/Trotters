import { StyleSheet } from "react-native";
import {COLORS, SIZES, SHADOWS} from "../resources/index";

const styles = StyleSheet.create({
  container: {
      backgroundColor: COLORS.secondary,
      flex: 1
    },

    top: {
      height: "7.5%",
      backgroundColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },

    logo: {
      fontFamily: 'bold',
      fontSize: 30,
      color: COLORS.white
    },

    user: {
      //height: "32.5%",
      backgroundColor: COLORS.white,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      paddingVertical: 30
    },

    scrollContainer: {
      flexGrow: 1,  // Allows the ScrollView to grow to accommodate its content
      marginBottom: 70,  // Adds padding to the bottom for better spacing
    },

    pfp: {
      height: 150,
      width: 150,
      borderRadius: 100,
      borderWidth: 5,
      borderColor: COLORS.secondary
    },

    name: {
      fontFamily: 'bold',
      fontSize: SIZES.medium
    },

    nationality: {
      fontFamily: 'semibold',
      fontSize: SIZES.small
    },

    attribute: {
      backgroundColor: COLORS.white,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      flexBasis: 'auto',
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
      padding: 5,
      paddingLeft: -5
    },

    line: {
      backgroundColor: COLORS.gray,
      borderRadius: 20,
      height: 1,
      width: '90%',
      opacity: 0.5
    },

    tag:{
      fontFamily: 'semibold',
      fontSize: SIZES.small,
      alignSelf: 'flex-start',
      paddingLeft: '5%'
    },

    info: {
      fontFamily: 'regular',
      fontSize: SIZES.medium,
      alignSelf: 'flex-start',
      paddingLeft: '5%'
    },

})

export default styles;

