import { StyleSheet } from "react-native"
import { COLORS, SHADOWS } from "../resources"

const styles = StyleSheet.create({
    usernameContainer: {
        height: "5%",
        width: "65%",
        backgroundColor: COLORS.white,
        borderRadius: 100,
        margin: 10
    },

    passwordContainer: {
        height: "5%",
        width: "65%",
        backgroundColor: COLORS.white,
        borderRadius: 100,
        marginTop: 10
    },

    sigInContainer:{
        height: "5%",
        width: "30%",
        backgroundColor: COLORS.primary,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        ...SHADOWS.medium,
        marginTop: 10
    },
    
    underline: {
        textDecorationLine: "underline",
        color: "#3366CC"
    }

})

export default styles;