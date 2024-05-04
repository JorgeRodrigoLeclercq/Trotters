import { StyleSheet } from "react-native";
import {COLORS, SIZES, SHADOWS} from "../resources/index";

const styles = StyleSheet.create({
    container:  {
        backgroundColor: COLORS.lightWhite,
        height: "100%"
    },

    searchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        marginHorizontal: SIZES.small,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.xxLarge,
        marginVertical: SIZES.xxLarge,
        height: 50
    },

    searchBox: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: COLORS.black,
        borderWidth: 1,
        borderRadius: 8
    },

    searchIcon: {
        marginHorizontal: 10,
        color: COLORS.gray,
        marginTop: SIZES.small
    },

    searchWrapper: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginRight: SIZES.small,
        borderRadius: SIZES.small
    },
    
    searchInput: {
        fontFamily: "regular",
        width: "100%",
        height: "100%",
        paddingHorizontal: SIZES.small
    },

    searchBtn: {
        width: 50,
        height: "100%",
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary
    },
    containerGPT: {
        flex: 1,
        marginHorizontal: 20,
        marginTop: 50,
        backgroundColor: '#fff', // Set a white background for the overall view
      },
      searchBoxGPT: {
        fontSize: 16,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc', // Light grey line under the text input
        marginBottom: 20,
      },
      listItem: {
        backgroundColor: '#f8f8f8', // Light grey background for each item
        padding: 20,
        marginVertical: 8,
        borderRadius: 10,
        shadowColor: '#000', // Adding shadow
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      },
      listItemText: {
        fontSize: 18,
        color: '#333', // Dark grey color for text
      }
})

export default styles;