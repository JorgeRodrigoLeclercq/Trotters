import { StyleSheet } from "react-native"
import { COLORS, SHADOWS, SIZES } from "../resources"
import { ErrorMessage } from "formik";

const styles = StyleSheet.create({
    // usernameContainer: {
    //     height: "5%",
    //     width: "65%",
    //     backgroundColor: COLORS.white,
    //     borderRadius: 100,
    //     margin: 10
    // },

    // passwordContainer: {
    //     height: "5%",
    //     width: "65%",
    //     backgroundColor: COLORS.white,
    //     borderRadius: 100,
    //     marginTop: 10
    // },

    // sigInContainer:{
    //     height: "5%",
    //     width: "30%",
    //     backgroundColor: COLORS.primary,
    //     borderRadius: 100,
    //     justifyContent: "center",
    //     alignItems: "center",
    //     ...SHADOWS.medium,
    //     marginTop: 10
    // },
    
    // underline: {
    //     textDecorationLine: "underline",
    //     color: "#3366CC"
    // }

    cover: {
        height: SIZES.height/2.4,
        width: SIZES.width-60,
        resizeMode: "contain",
        marginBottom: SIZES.xxLarge
    },

    title: {
        //fontFamily: "bold",
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
        //fontFamily: "regular",
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
        //fontFamily: "regular",
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