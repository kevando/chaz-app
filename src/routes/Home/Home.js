import React from 'react';
import { Text, View } from 'react-native';
import Button from '../../components/Button';
import styles from './styles';

const Home = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.main}>
        Home
      </Text>
      <Button
        text="Details"
        onPress={props.onDetailsPress}
      />
      <Button
        text="Add Rec"
        onPress={props.onAddRecPress}
      />
    </View>
  );
};

Home.propTypes = {
  onDetailsPress: React.PropTypes.func,
  onAddRecPress: React.PropTypes.func,
};

export default Home;
