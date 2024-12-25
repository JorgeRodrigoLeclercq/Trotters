import { StyleSheet } from "react-native";
import {COLORS, SIZES } from "../resources/index";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: "10%",
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row"
  },
  logo: {    
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    color: COLORS.primary
  },
  settingsWrapper: {
    position: "absolute", 
    right: 10, 
    top: 25
  },
  dataContainer: {
    height: "90%"
  },
  user: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: SIZES.medium
  },
  location: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14
  },
  attribute: {
    margin: 15
  },
  tag:{
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    paddingLeft: '5%'
  },
  data: {
    fontFamily: 'Poppins-Medium',
    fontSize: SIZES.medium,
    paddingHorizontal: '5%'
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',    
    paddingLeft: '5%'  
  },
  interestContainer: {
    justifyContent: 'center',
    alignItems: 'center',  
    flexDirection: 'row',  
    paddingHorizontal: 10,
    borderRadius: 25,  
    borderWidth: 2,  
    margin: 1
  },
  circle: {
    width: 10,  
    height: 10,
    borderRadius: 25,  
    marginRight: 5
  },
  interest: {
    fontFamily: 'Poppins-Medium',
    fontSize: SIZES.medium,
    paddingTop: 4
  }
})

export default styles;

