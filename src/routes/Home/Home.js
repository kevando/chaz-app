import React from 'react';
import { Text, View } from 'react-native';
import Button from '../../components/Button';
import styles from './styles';

const Home = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.main}>
        chaz
      </Text>
      <Button
        text="Add Rec"
        onPress={props.onAddRecPress}
      />
    </View>
  );
};

Home.propTypes = {
  onAddRecPress: React.PropTypes.func,
};

export default Home;
