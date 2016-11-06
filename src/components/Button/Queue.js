import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { colors } from '../../config/styles';
import Categories from '../../lib/Categories';
import Routes from '../../config/routes';

const Button = (props) => {

  // Defaults
  const { category, navigator } = props;
  if(props.navigator){alert('asdf')}


  return (
    <TouchableOpacity onPress={() => navigator.push(Routes.getQueueRoute(category)) }>
      <View style={styles.queueContainer}>
        <Text style={styles.button}>
          View {Categories[category].label} Queue
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
