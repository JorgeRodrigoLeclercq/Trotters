import { StyleSheet } from "react-native";
import {COLORS, SIZES } from "../resources/index";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  header: {
    width: "100%",
    height: "10%",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row"
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: SIZES.large,
    color: COLORS.black
  },
  backWrapper: {
    marginLeft: 5,
    marginBottom: 5
  },
  button: {
    width: "50%",
    height: "10%",
    justifyContent: "center",
    alignItems: "center"
  }
})

export default styles;

