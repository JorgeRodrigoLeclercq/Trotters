import { StyleSheet } from "react-native"
import { COLORS, SHADOWS, SIZES } from "../resources"
import { ErrorMessage } from "formik";

const styles = StyleSheet.create({
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    interestButton: {
        padding: 10,
        margin: 5,
        backgroundColor: COLORS.offwhite,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.gray,
    },
    selectedInterestButton: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    interestButtonText: {
        color: COLORS.gray,
    },
    selectedInterestButtonText: {
        color: COLORS.white,
    },
    errorMessage: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    dropdown: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 5,
        maxHeight: 200,
    },
    dropdownItem: {
        padding: 10,
    },
    cover: {
        height: SIZES.height/2.4,
        width: SIZES.width-60,
        resizeMode: "contain",
        marginBottom: SIZES.xxLarge
    },

    title: {
        fontFamily: "bold",
        fontSize: SIZES.xLarge,
        color: COLORS.primary,
        alignItems: "center",
        marginBottom: SIZES.xxLarge
    },
    wrapper: {
        marginBottom: 20,
        marginHorizontal: 20
    },
    label: {
        fontFamily: "regular",
        fontSize: SIZES.xSmall,
        marginBottom: 5,
        marginEnd: 5,
        textAlign: "right"
    },
    inputWrapper: (borderColor) => ({
        borderColor: borderColor,
        backgroundColor: COLORS.lightWhite,
        borderWidth: 1,
        height: 55,
        borderRadius: 12,
        flexDirection: 'row',
        paddingHorizontal: 15,
        alignItems: "center"
    }),
    iconStyle: {
        marginRight: 10
    },
    errorMessage: {
        color: COLORS.red,
        fontFamily: "regular",
        marginTop: 5,
        marginLeft: 5,
        fontSize: SIZES.xSmall
    },
    registration: {
        marginTop:20,
        textAlign: "center"
    }

})

export default styles;