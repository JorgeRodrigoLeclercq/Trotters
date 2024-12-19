import { StyleSheet } from "react-native"
import { COLORS } from "../resources"

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
        marginTop: 60,
        marginBottom: 65,
        borderRadius: 25, 
        padding: 5, 
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60, 
    },
    wrapper: {
        marginBottom: '15%',
        marginHorizontal: '5%'
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
        justifyContent: "center",
        alignItems: "center"
    }
})

export default styles;