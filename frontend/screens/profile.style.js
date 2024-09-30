import { StyleSheet } from "react-native";
import {COLORS, SIZES, SHADOWS} from "../resources/index";

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1
  },

  top: {
    height: "7.5%",
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",
  },

  logo: {
    fontFamily: 'bold',
    fontSize: 30,
    color: COLORS.primary,
    textAlign: 'center',
    flex: 1
  },
  
  user: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 30
  },

  scrollContainer: {
    flexGrow: 1,  
    marginBottom: 70,  
  },

  pfp: {
    height: 150,
    width: 150,
    borderRadius: 100,
    borderWidth: 5,
  },

  name: {
    fontFamily: 'bold',
    fontSize: SIZES.medium
  },

  nationality: {
    fontFamily: 'semibold',
    fontSize: SIZES.mediumish
  },

  attribute: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: 'auto',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    paddingLeft: -5
  },

  tag:{
    fontFamily: 'semibold',
    fontSize: SIZES.small,
    alignSelf: 'flex-start',
    paddingLeft: '5%'
  },

  info: {
    fontFamily: 'regular',
    fontSize: SIZES.medium,
    alignSelf: 'flex-start',
    paddingLeft: '5%'
  },

  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',  
    justifyContent: 'flex-start',  
    alignSelf: 'flex-start',  
    paddingLeft: '5%'  
  },

  interestContainer: {
    flexDirection: 'row',  
    alignItems: 'center',  
    borderWidth: 2,  
    borderRadius: 15,  
    paddingHorizontal: 10,
    margin: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  circle: {
    width: 10,  
    height: 10,
    borderRadius: 5,  
    marginRight: 8
  },

  interest: {
    fontFamily: 'regular',
    fontSize: SIZES.medium,
    alignSelf: 'flex-start'
  }

})

export default styles;

