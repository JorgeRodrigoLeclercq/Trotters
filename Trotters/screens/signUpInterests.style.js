import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../resources';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    placeholderContainer:{
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    placeholder:{
        fontFamily: 'Poppins-SemiBold',
        color: COLORS.black,
        fontSize: SIZES.medium
    },
    subPlaceholder: {
        fontFamily: 'Poppins-Semibold',
        color: COLORS.black,
        fontSize: 14
    },
    scrollViewWrapper:{
        height: '80%'
    },
    scrollView: {
        flexGrow: 1,
        marginHorizontal: '2%'
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5
    },
    interestWrapper: {
        justifyContent: 'center',
        alignItems: 'center', 
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderWidth: 2,  
        borderRadius: 25,
        marginBottom: 1
    },
    circle: {
        width: 10,  
        height: 10,
        borderRadius: 25,  
        marginRight: 5
    },
    interest: {
        fontFamily: 'Poppins-Regular',
        fontSize: SIZES.medium
    },
    buttonContainer: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;