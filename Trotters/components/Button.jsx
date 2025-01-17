import { Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../resources/index';

const Button = ({title, onPress, isValid, isLoading, color, textColor}) => {
    return(
        <TouchableOpacity 
            style={styles.buttonWrapper(isValid === false ? COLORS.gray : color)}
            onPress={onPress}> 
            {isLoading === false ? (
                <Text style={styles.buttonText(textColor)}>{title}</Text>
            ):(
                <ActivityIndicator/>
            )}
        </TouchableOpacity>
    )
}

export default Button;

const styles = StyleSheet.create({
    buttonWrapper: (backgroundColor)=>({
        width: '80%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor,
        borderRadius: 25
    }),
    buttonText: (textColor)=>({
        fontFamily: 'Poppins-Bold',
        color: textColor,
        fontSize: 18
    })
})