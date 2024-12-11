import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../resources";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    placeholderWrapper:{
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    placeholder:{
        fontFamily: 'Poppins-Bold',
        color: COLORS.black,
        fontSize: SIZES.medium
    },
    scrollViewWrapper:{
        height: '80%'
    },
    interestsScroll: {
        flexGrow: 1,
        padding: 10,
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    interestContainer: {
        justifyContent: 'center',
        alignItems: 'center', 
        flexDirection: 'row',
        paddingHorizontal: 5 ,
        borderWidth: 2,  
        borderRadius: 25,
        borderColor: COLORS.gray,
        marginBottom: 1
    },
    circle: {
        width: 10,  
        height: 10,
        borderRadius: 5,  
        marginRight: 8,
        backgroundColor: COLORS.gray 
    },
    interest: {
        fontFamily: 'Poppins-Regular',
        fontSize: SIZES.mediumish
    },
    button: {
        width: '100%',
        height: '10%',
        justifyContent: "center",
        alignItems: "center",
    }
});

export default styles;