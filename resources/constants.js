import { Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window');

const COLORS = {
  primary: "#15F500",
  secondary: "#E000F5",
  tertiary: "#16E0DD",

  brown: "#46271C",
  gray: "#CCCCCC",

  offwhite: "#F3F4F8",
  white: "#FFFFFF",
  lightWhite: "#FAFAFC",
  black: "#000000",
  red: "#e81e4d",
};


const SIZES = {
  xSmall: 10,
  small: 12,
  mediumish: 14,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 44,
  height,
  width
};


const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, SIZES , SHADOWS };
