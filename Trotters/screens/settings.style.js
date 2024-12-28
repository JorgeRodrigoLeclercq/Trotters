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
  title: {
    position: 'absolute', 
    left: '10%', 
    top: '25%',
    fontFamily: 'Poppins-Bold',
    fontSize: SIZES.large,
    color: COLORS.black
  },
  backWrapper: {
    position: 'absolute', 
    left: '2%', 
    top: '25%'
  },
  button: {
    width: '50%',
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default styles;

