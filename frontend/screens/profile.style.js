import { StyleSheet } from "react-native";
import {COLORS, SIZES} from "../resources/index";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: COLORS.white
      },

      top: {
        flex: 0.4,
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },

      pfp: {
        height: 125,
        width: 125,
        borderRadius: 100,
        borderWidth: 5,
        borderColor: COLORS.white
      },

      id: {
        fontFamily: "bold",
        fontSize: SIZES.medium,
      }

})

export default styles;

