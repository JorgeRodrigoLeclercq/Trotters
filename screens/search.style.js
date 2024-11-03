import { StyleSheet } from "react-native";
import {COLORS, SIZES, SHADOWS} from "../resources/index";

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        height: 55,
        backgroundColor: '#ffffff',
        borderRadius: 100,
        paddingHorizontal: 10,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 5,
        // elevation: 5,
        marginTop: 50,
        marginBottom: 15,
    },
    searchBar: {
        flex: 1,
        height: '100%',
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
        paddingHorizontal: 15,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    },
    searchIcon: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: COLORS.primary,
        paddingHorizontal: 15,
        borderRadius: 500,
        marginRight: -15,
    },
    searchIconText: {
        color: 'white',
        fontSize: 16,
    },
    flatListContainer: {
        width: '90%',
        borderRadius: 10,
        overflow: 'hidden', 
        backgroundColor: 'white',
        //marginTop: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        zIndex: 3, 
        position: 'absolute', // Set position to absolute
        top: 110, // Adjust top value to position it correctly
    },
    flatList: {
        width: '100%',
        backgroundColor: 'white',
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.white,
    },
    userContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: '2%',
        paddingVertical: 10,
        zIndex: 1
    },
    userCard: {
        width: '47%',
        height: 250,
        backgroundColor: '#f9f9f9',
        borderRadius: 20,
        marginBottom: 10, 
        marginHorizontal: '1.5%',
        overflow: 'hidden',
    },
    userInfo: {
        position: 'absolute',
        width: '100%',
        padding: 10,
        bottom: 0,
        zIndex: 2
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    userAge: {
        fontSize: 14,
        color: 'white',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;