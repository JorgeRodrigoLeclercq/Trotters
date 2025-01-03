import { StyleSheet } from 'react-native'
import { COLORS } from '../resources'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    scrollViewWrapper:{
        height: '90%'
    },
    valuesScroll: {
        flexGrow: 1
    },
    imageWrapper: {
        alignSelf: 'center',
        borderRadius: 25, 
        marginTop: '10%',
        marginBottom: '20%'
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 100
    },
    wrapper: {
        marginBottom: '15%',
        marginHorizontal: '3%'
    },
    inputWrapper: (height, borderColor) => ({
        height: height,
        flexDirection: 'row',
        borderColor: borderColor,
        borderWidth: 2,
        borderRadius: 25,
        paddingHorizontal: '5%'
    }),
    button: {
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default styles;