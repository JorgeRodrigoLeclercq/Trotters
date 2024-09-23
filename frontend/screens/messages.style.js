import { StyleSheet } from "react-native";
import { COLORS, SIZES, SHADOWS } from "../resources/index";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: SIZES.medium,
    padding: SIZES.small,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    elevation: 2,
  },
  searchIcon: {
    marginRight: SIZES.small,
  },
  searchInput: {
    flex: 1,
    fontSize: SIZES.medium,
    color: COLORS.gray,
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
    marginVertical: SIZES.small,
    marginHorizontal: SIZES.medium,
    borderRadius: SIZES.medium,
    elevation: 3,
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
    fontSize: SIZES.small,
    color: COLORS.gray,
    marginTop: 2,
  },
});

export default styles;
