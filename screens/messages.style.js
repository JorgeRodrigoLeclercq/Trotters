import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../resources/index";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.gray,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.small,
    backgroundColor: COLORS.white,  // Same color as status bar
    borderBottomWidth: 1,  // Only a line at the bottom
    borderBottomColor: COLORS.white,
  },
  searchIcon: {
    marginRight: SIZES.small,
  },
  searchInput: {
    flex: 1,
    fontSize: SIZES.medium,
    color: COLORS.gray,
    paddingBottom: 2,  // Small padding for better text input experience
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: COLORS.red,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: SIZES.small,
    borderBottomWidth: 1,  // Divider between items like Instagram
    borderBottomColor: COLORS.white,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: SIZES.small,
  },
  textContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    color: COLORS.black,
  },
  messageText: {
    fontSize: SIZES.mediumish,
    color: COLORS.gray,
    marginTop: 2,
  },
});

export default styles;


