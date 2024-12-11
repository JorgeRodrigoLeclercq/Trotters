import { StyleSheet } from "react-native";
import {COLORS, SIZES, SHADOWS} from "../resources/index";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    searchContainer: {
        width: '100%',
        height: '80%',
        alignItems: 'center'
    },
    searchBarContainer: {
        width: '90%',
        backgroundColor: COLORS.white,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: '10%'
    },
    searchBar: {
        flex: 1,
        paddingHorizontal: 25
    },
    flatListContainer: {
        width: '90%',
        borderRadius: 10,
        shadowColor: COLORS.black,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 10,
        overflow: 'hidden'
    },
    flatList: {
        backgroundColor: COLORS.white,
    },
    item: {
        padding: '3%',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.white,
    },
    button: {
        width: '100%',
        height: '20%',
        justifyContent: "center",
        alignItems: "center",
    }
});

export default styles;