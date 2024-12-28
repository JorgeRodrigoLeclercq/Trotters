import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../resources/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  searchContainer: {
    height: '10%',
    flexDirection: 'row',
    paddingHorizontal: 33
  },
  searchBar: {
    flex: 1,
    color: COLORS.black
  },
  listWrapper: {
    marginLeft: '2%'
  },
  conversationContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,  
    borderBottomColor: COLORS.white
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: '1.5%'
  },
  recipientAndLastMessage: {
    marginLeft: '2%'
  },
  recipient: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: SIZES.medium,
    color: COLORS.black
  },
  lastMessage: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.gray
  }
});

export default styles;


