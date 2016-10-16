import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from './styles';

const Loading = (props) => {
  const message = props.message || 'Generic loading screen'
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating
        size={props.size}
        {...props}
      />
    <Text>{message}</Text>
    </View>
  );
};

Loading.propTypes = {
  size: React.PropTypes.string,
};

Loading.defaultProps = {
  size: 'large',
};

export default Loading;
