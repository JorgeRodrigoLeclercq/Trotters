import { StyleSheet } from "react-native"
import { COLORS, SIZES } from "../resources"

const styles = StyleSheet.create({
    header: {
      height: "10%",
      alignItems: 'center',
      flexDirection: 'row',
      marginLeft: 5
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginLeft: 5
    },
    name: {
      fontFamily: "Poppins-SemiBold",
      fontSize: SIZES.large,
      marginLeft:10
    },
    messagesContainer: {
      flex: 1,
      padding: 10
    },
    messageWrapper: {
      maxWidth: '80%',
      padding: 10,
      borderRadius: 25,
      marginBottom: 10
    },
    currentMessage: {
      alignSelf: 'flex-end',
      backgroundColor: COLORS.primary
    },
    otherMessage: {
      alignSelf: 'flex-start',
      backgroundColor: COLORS.secondary
    },
    message: {
      fontFamily: "Poppins-Medium",
      color: COLORS.white
    },
    inputContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      padding: 10
    },
    input: {
      flex: 1,
      padding: 10,
      borderRadius: 20
    },
    sendButton: {
      marginLeft: 10
    }
  });

export default styles;