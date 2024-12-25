import { StyleSheet } from "react-native";
import {COLORS, SIZES } from "../resources/index";

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
    flatListContainer: {
        width: '95%',
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute', 
        left: "2.5%",
        top: 75,
        borderRadius: 10,
        overflow: 'hidden', 
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
        zIndex: 3
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
    usersContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: '2%',
        paddingVertical: 1,
        zIndex: 1
    },
    userCard: {
        width: '47%',
        height: 250,
        borderRadius: 20,
        marginBottom: 10, 
        marginHorizontal: '1.5%',
        overflow: 'hidden',
    },
    userData: {
        position: 'absolute',
        padding: 10,
        bottom: 0,
        zIndex: 2
    },
    userName: {
        fontFamily: "Poppins-Bold",
        fontSize: SIZES.large,
        color: COLORS.white
    },
    userAge: {
        fontFamily: "Poppins-SemiBold",
        fontSize: SIZES.medium,
        color: COLORS.white
    },
    profileImage: {
        width: '100%',
        height: '100%'    
    },
    modalWrapper: { 
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
});

export default styles;