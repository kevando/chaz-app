import React, {Component} from 'react';
import { View, Text, TextInput } from 'react-native';
import { InputGroup, Input, Icon, Button } from 'native-base';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import styles from './styles';

class ConfirmRecommendation extends Component {

  render() {

    const { unfinished, onSaveRecommendationPress } = this.props;

    return (
      <View style={styles.container}>
        <Text>Title: {unfinished.title}</Text>
        <Text>Friend: {unfinished.friend}</Text>
        <Button onPress={onSaveRecommendationPress}>Save</Button>
      </View>
    );

  }

}

export default ConfirmRecommendation;
