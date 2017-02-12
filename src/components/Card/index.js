import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from './styles';


const Card = ({ rec, onPress, }) => {

  return (

      <View style={styles.container}>

        <View style={styles.iconContainer}>
          <Text style={styles.icon}>🗣️</Text>
        </View>

        <View style={styles.textContainer}>

          <View style={styles.recContainer}>
            <Text style={styles.rec}>{rec.title}</Text>
          </View>

          <View style={styles.friendContainer}>
            <Text style={styles.friend}>Recommended by: <Text style={styles.bold}>{rec.friend}</Text></Text>
          </View>

        </View>

      </View>

  );
};

Card.propTypes = {
  rec: React.PropTypes.object,
  // friend: React.PropTypes.string,
  onPress: React.PropTypes.func,
};

Card.defaultProps = {
  rec: {title: 'DUMMY', friend: 'duude'},
  onPress: () => console.log('Button Pressed'),
};

export default Card;
