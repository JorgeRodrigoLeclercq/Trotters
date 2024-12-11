import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from 'react';
import { COLORS } from '../resources/index';

const Button = ({title, onPress, isValid, loader, color, colorText}) => {
    return(
        <TouchableOpacity onPress={onPress} style={styles.btnStyle(isValid===false?COLORS.gray:color)}>
            {loader === false? (<Text style={styles.btnTxt(colorText)}>{title}</Text>
        ):(
        <ActivityIndicator/>)}
        </TouchableOpacity>
    )
}

export default Button

const styles = StyleSheet.create({
    btnTxt: (colorText)=>({
        fontFamily: "Poppins-Bold",
        color: colorText,
        fontSize: 18
    }),
    btnStyle: (backgroundColor)=>( {
        height: 50,
        width: '80%',
        marginVertical: 20,
        backgroundColor: backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25
    }
)
})