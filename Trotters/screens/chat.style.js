import { StyleSheet } from "react-native"
import { COLORS, SIZES } from "../resources"

const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: COLORS.white
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
      padding: 10,
      backgroundColor: COLORS.white
    },
    message: {
      padding: 10,
      borderRadius: 20,
      marginBottom: 10,
      maxWidth: '80%',
    },
    userMessage: {
      alignSelf: 'flex-end',
      backgroundColor: COLORS.primary
    },
    otherMessage: {
      alignSelf: 'flex-start',
      backgroundColor: COLORS.secondary
    },
    inputContainer: {
      flexDirection: 'row',
      padding: 10,
      alignItems: 'center',
      backgroundColor: COLORS.white
    },
    input: {
      flex: 1,
      padding: 10,
      backgroundColor: COLORS.white,
      borderRadius: 20
    },
    sendButton: {
      marginLeft: 10
    }
  });

export default styles;