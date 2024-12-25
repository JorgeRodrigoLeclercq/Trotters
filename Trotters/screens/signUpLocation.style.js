import { StyleSheet } from "react-native";
import { COLORS } from "../resources/index";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    searchContainer: {
        width: '100%',
        height: '90%',
        alignItems: 'center'
    },
    searchBarContainer: {
        width: '90%',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: '5%',
        backgroundColor: COLORS.white
    },
    searchBar: {
        flex: 1,
        paddingHorizontal: 25
    },
    flatListContainer: {
        width: '90%',
        borderRadius: 10,
        marginTop: "1%",
        shadowColor: COLORS.black,
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
        overflow: 'hidden'
    },
    flatList: {
        backgroundColor: COLORS.white,
    },
    item: {
        padding: '3%',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.white
    },
    button: {
        width: '100%',
        height: '10%',
        justifyContent: "center",
        alignItems: "center"
    }
});

export default styles;