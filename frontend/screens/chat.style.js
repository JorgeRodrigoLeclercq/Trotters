import { StyleSheet } from "react-native"
import { COLORS, SIZES } from "../resources"

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#f0f0f0'
    },
    profilePic: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginLeft: 10
    },
    userName: {
      marginLeft: 10,
      fontWeight: 'bold'
    },
    messagesContainer: {
      flex: 1,
      padding: 10
    },
    message: {
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
      maxWidth: '80%'
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: '#dcf8c6'
    },
    otherMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#fff'
    },
    inputContainer: {
      flexDirection: 'row',
      padding: 10,
      alignItems: 'center',
      backgroundColor: '#f0f0f0'
    },
    input: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
      borderRadius: 20
    },
    sendButton: {
      marginLeft: 10
    }
  });
  
// const styles = StyleSheet.create({
//     topContainer : {
//         flex: 0.15, 
//         backgroundColor: COLORS.primary, 
//         flexDirection: "row",  
//         alignItems: "center"
//     },

//     pfp: {
//         height: SIZES.xxLarge, 
//         width: SIZES.xxLarge, 
//         borderRadius: 25
//     },

//     receiver: {
//         fontSize: SIZES.xLarge, 
//         fontFamily: "semibold"
//     },

//     input: {
//         height: 40,
//         margin: 12,
//         borderWidth: 1,
//         padding: 10
//     }
// })

export default styles;