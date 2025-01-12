import { StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../resources'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  header: {
    height: '10%',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: '2%'
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: '1%'
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: SIZES.medium,
    color: COLORS.black,
    marginLeft: '2%'
  },
  messagesContainer: {
    flex: 1,
    padding: '2%'
  },
  messageWrapper: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 25,
    marginBottom: 10
  },
  currentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.primary
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.secondary
  },
  message: {
    fontFamily: 'Poppins-Medium',
    color: COLORS.white
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10
  },
  input: {
    flex: 1,
    color: COLORS.black,
    padding: 10
  },
  sendButtonContainer: {
    marginRight: '2%'
  }
});

export default styles;