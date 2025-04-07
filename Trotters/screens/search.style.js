import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../resources/index';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    searchBarContainer: {
        height: '10%',
        paddingHorizontal: 33
    },
    searchBar: {
        flex: 1,
        color: COLORS.black
    },
    flatListContainer: {
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute', 
        left: '2.5%',
        top: '9%',
        borderRadius: 10,
        marginTop: '1%',
        shadowColor: COLORS.black,
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
        overflow: 'hidden',
        zIndex: 3
    },
    flatList: {
        width: '100%',
        backgroundColor: COLORS.white,
    },
    item: {
        padding: '3%',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.white
    },
    usersContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 70,
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
    userDataContainer: {
        position: 'absolute',
        margin: 10,
        bottom: 0,
        zIndex: 2
    },
    userName: {
        fontFamily: 'Poppins-Bold',
        fontSize: SIZES.large,
        color: COLORS.white
    },
    userAge: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: SIZES.medium,
        color: COLORS.white
    },
    profileImage: {
        width: '100%',
        height: '100%'    
    },
    modalContainer: { 
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
});

export default styles;