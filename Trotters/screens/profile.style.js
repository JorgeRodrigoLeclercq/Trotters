import { StyleSheet } from 'react-native';
import {COLORS, SIZES } from '../resources/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  header: {
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  logo: {    
    width: 150,
    height: 27.2010,
    marginTop: -20
  },
  settingsWrapper: {
    position: 'absolute', 
    right: '4%', 
    top: '25%'
  },
  dataContainer: {
    flexGrow: 1,
    paddingBottom: 70
  },
  user: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '6%',
    marginBottom: '9%',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: SIZES.medium,
    color: COLORS.black
  },
  location: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: COLORS.black
  },
  attribute: {
    margin: '3%'
  },
  tag:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: SIZES.small,
    color: COLORS.black,
    paddingHorizontal: '5%'
  },
  data: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.medium,
    color: COLORS.black,
    paddingHorizontal: '5%'
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',    
    paddingHorizontal: '5%'  
  },
  interestContainer: {
    justifyContent: 'center',
    alignItems: 'center',  
    flexDirection: 'row',  
    paddingHorizontal: 10,
    borderRadius: 25,  
    borderWidth: 2,  
    margin: 2
  },
  circle: {
    width: 10,  
    height: 10,
    borderRadius: 25,  
    marginRight: 5
  },
  interest: {
    fontFamily: 'Poppins-Regular',
    fontSize: SIZES.medium,
    color: COLORS.black
  }
})

export default styles;

