import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import React from 'react';
import { COLORS } from '../resources/index';

const Button = ({title, onPress, isValid, loader}) => {
    return(
        <TouchableOpacity onPress={onPress} style={styles.btnStyle(isValid===false?COLORS.gray:COLORS.primary)}>
            {loader === false? (<Text style={styles.btnTxt}>{title}</Text>
        ):(
        <ActivityIndicator/>)}
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    btnTxt: {
        fontFamily: "Poppins-Bold",
        color: COLORS.white,
        fontSize: 18
    },
    btnStyle: (backgroundColor)=>( {
        height: 50,
        width: '100%',
        marginVertical: 20,
        backgroundColor: backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12
    }
)
})