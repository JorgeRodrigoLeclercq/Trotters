import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../resources';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    placeholderWrapper:{
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    placeholder:{
        fontFamily: 'Poppins-SemiBold',
        color: COLORS.black,
        fontSize: SIZES.medium
    },
    scrollViewWrapper:{
        height: '80%'
    },
    interestsScroll: {
        flexGrow: 1,
        marginHorizontal: '2%'
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 5
    },
    interestContainer: {
        justifyContent: 'center',
        alignItems: 'center', 
        flexDirection: 'row',
        paddingHorizontal: 5,
        borderWidth: 2,  
        borderRadius: 25,
        marginBottom: 1
    },
    circle: {
        width: 10,  
        height: 10,
        borderRadius: 5,  
        marginRight: 8
    },
    interest: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14
    },
    button: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;