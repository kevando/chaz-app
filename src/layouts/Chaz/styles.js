import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export const headerStyle = {
  // backgroundColor: colors.green,
  // borderWith: 5,
  // borderColor: 'red'
}

export default styles = StyleSheet.create({
  icon: {
    height: 30,
    width: 30,
    tintColor: '#929292',
  },
  iconSelected: {
    tintColor: 'rgb(0, 122, 255)',
  },
  navBar: {
    backgroundColor: colors.purple,
    borderBottomWidth: 0,
    borderColor: colors.darkPurple
  }
});

export const navigationBarStyle = {
  backgroundColor: colors.purple,
  borderBottomWidth: 0,
}

export const titleStyle = {
  color: 'white'
}
