import { StyleSheet } from 'react-native';
import {COLORS, SIZES } from '../resources/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  header: {
    width: '100%',
    height: '10%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  settings: {
    position: 'absolute', 
    left: '10%', 
    fontFamily: 'Poppins-Bold',
    fontSize: SIZES.large,
    color: COLORS.black
  },
  backButtonContainer: {
    position: 'absolute', 
    left: '2%', 
    top: '27.5%'
  },
  buttonContainer: {
    width: '50%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contactContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  contactText: {
      fontSize: 16,
      color: COLORS.primary,
      textDecorationLine: 'underline'
  }
})

export default styles;

