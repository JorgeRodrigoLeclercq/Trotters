import { StyleSheet } from 'react-native';
import { COLORS } from '../resources/index';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: COLORS.white
    },
    searchBarContainer: {
        width: '100%',
        height: '90%',
        alignItems: 'center'
    },
    searchBarWrapper: {
        width: '90%',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: '5%',
        paddingHorizontal: 25,
        backgroundColor: COLORS.white
    },
    searchBar: {
        flex: 1
    },
    flatListContainer: {
        width: '90%',
        borderRadius: 10,
        marginTop: '1%',
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
    buttonContainer: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;