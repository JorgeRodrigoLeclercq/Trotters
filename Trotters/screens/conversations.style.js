import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../resources/index";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchContainer: {
    height: "10%",
    flexDirection: 'row',
    paddingHorizontal: 33
  },
  search: {
    flex: 1
  },
  listWrapper: {
    marginTop: "-3%"
  },
  conversationContainer: {
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.small,
    borderBottomWidth: 1,  
    borderBottomColor: COLORS.white
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: '1%'
  },
  recipientAndLastMessage: {
    marginLeft: '2%'
  },
  recipient: {
    fontFamily: "Poppins-SemiBold",
    fontSize: SIZES.medium
  },
  lastMessage: {
    fontSize: SIZES.mediumish,
    marginTop: 2
  }
});

export default styles;


