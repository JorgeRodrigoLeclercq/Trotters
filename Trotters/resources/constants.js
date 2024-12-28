import { Dimensions } from 'react-native'
const { height, width } = Dimensions.get('window');

const COLORS = {
  primary: '#15F500',
  secondary: '#16E0DD',

  gray: '#CCCCCC',
  white: '#FFFFFF',
  black: '#000000'
  };

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 44
};

export { COLORS, SIZES };
