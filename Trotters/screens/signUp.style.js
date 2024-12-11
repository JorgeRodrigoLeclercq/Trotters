import { StyleSheet } from "react-native"
import { COLORS, SHADOWS, SIZES } from "../resources"
import { ErrorMessage } from "formik";

const styles = StyleSheet.create({
    imageWrapper: {
        alignSelf: 'center',
        marginTop: 60,
        marginBottom: 65,
        borderRadius: 100, 
        padding: 5, 
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60, 
    },
    wrapper: {
        marginBottom: 65,
        marginHorizontal: 20
    },
    inputWrapper: (height, borderColor) => ({
        borderColor: borderColor,
        backgroundColor: COLORS.lightWhite,
        borderWidth: 1,
        height: height,
        borderRadius: 12,
        flexDirection: 'row',
        paddingHorizontal: 15
    }),
    errorMessage: {
        color: COLORS.red,
        fontFamily: "Poppins-Regular",
        marginTop: 5,
        marginLeft: 5,
        fontSize: SIZES.xSmall
    },
    button: {
        justifyContent: "center",
        alignItems: "center"
    }
})

export default styles;