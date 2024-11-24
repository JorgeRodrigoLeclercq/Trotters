import { StyleSheet } from "react-native";
import {COLORS, SIZES, SHADOWS} from "../resources/index";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1
  },

  header: {
    flexDirection: "row"
  },

  title: {
    color: COLORS.black,
    fontSize: SIZES.large,
    fontFamily: 'Poppins-SemiBold'
  },

  btnTxt: {
    fontFamily: "Poppins-Bold",
    color: COLORS.white,
    fontSize: 18
},

    btnStyle: {
        height: 50,
        width: '100%',
        marginVertical: 20,
        backgroundColor: COLORS.primary,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12
    }
})

export default styles;

