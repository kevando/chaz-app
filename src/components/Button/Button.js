import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { colors } from '../../config/styles';

const Button = (props) => {

  // Defaults
  const { text, onPress, color='white', bgcolor='blue', ghost={false} } = props;

  const customStyles = ghost === true ?
  {
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: colors.darkGrey,
    borderWidth:1,
    color:colors.black,
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 12,
    fontWeight: '300',
    borderRadius: 5
  } :
  {
    backgroundColor:colors[bgcolor],
    borderColor: colors[bgcolor],
    color:colors[color],
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={[styles.button,customStyles]}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  text: React.PropTypes.string,
  onPress: React.PropTypes.func,
};

Button.defaultProps = {
  text: 'Button Text',
  onPress: () => console.log('Button Pressed'),
};

export default Button;
