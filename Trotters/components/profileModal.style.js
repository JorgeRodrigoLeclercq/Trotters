import { StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../resources'

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: '90%',
        borderRadius: 25,
        backgroundColor: COLORS.white
    },
    upperDataContainer: {
        height: '40%'
    },
    nameAndLocationContainer: {
        position: 'absolute',
        marginLeft: '2.5%',
        bottom: 0,
        zIndex: 2
    },
    name: {
        fontFamily: 'Poppins-Bold',
        fontSize: SIZES.large,
        color: COLORS.white
    },
    location: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: SIZES.medium,
        color: COLORS.white
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25
    },
    dataContainer: {
        flexGrow: 1, 
        paddingBottom: 100
    },
    keyValueContainer: {
        marginHorizontal: '2.5%',
        marginVertical: '2.5%'
    },
    key: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: SIZES.small,
        color: COLORS.black
    },
    value: {
        fontFamily: 'Poppins-Regular',
        fontSize: SIZES.medium,
        color: COLORS.black
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    interestWrapper: {
        justifyContent: 'center',
        alignItems: 'center',  
        flexDirection: 'row',  
        paddingHorizontal: 10,
        borderRadius: 25,  
        borderWidth: 2,  
        margin: 2
    },
    circle: {
        width: 10,  
        height: 10,
        borderRadius: 25,  
        marginRight: 5
    },
    interest: {
        fontFamily: 'Poppins-Regular',
        fontSize: SIZES.medium,
        color: COLORS.black
    },
    buttonsContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0    
    },
    closeButtonWrapper: {
        width: 75,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '10%',
        marginVertical: '5%',
        borderRadius: 50,
        backgroundColor: COLORS.secondary
    },
    chatButtonWrapper: {
        width: 75,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: '10%',
        marginVertical: '5%',
        borderRadius: 50,
        backgroundColor: COLORS.primary
    }
});

export default styles;