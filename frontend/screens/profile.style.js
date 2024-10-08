import { StyleSheet } from "react-native";
import {COLORS, SIZES, SHADOWS} from "../resources/index";


const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        backgroundColor: COLORS.secondary
      },

      top: {
        height: "40%",
        backgroundColor: COLORS.tertiary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        elevation: 5,
      },

      pfp: {
        height: 125,
        width: 125,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: COLORS.white
      },

      name: {
        fontFamily: 'bold',
        fontSize: SIZES.medium,
        position: 'absolute',
        bottom: "20%"
      },

      nationality: {
        fontFamily: 'semibold',
        fontSize: SIZES.small,
        position: 'absolute',
        bottom: "15%"
      },

      attribute: {
        //height:"10%",
        //width:"90%",
        backgroundColor: COLORS.white,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexBasis: 'auto',
        marginLeft: 10,
        marginRight: 10
      },

      line: {
        backgroundColor: COLORS.gray,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 4,
        width: '90%'
      },

      tag:{
        fontFamily: 'semibold',
        fontSize: SIZES.large,
        alignSelf: 'flex-start',
        paddingLeft: '5%'
      },

      info: {
        fontFamily: 'regular',
        fontSize: SIZES.medium,
        alignSelf: 'flex-start',
        paddingLeft: '5%'
      },

      blankSpace: {
        flex: 0.05
      }

})

export default styles;

