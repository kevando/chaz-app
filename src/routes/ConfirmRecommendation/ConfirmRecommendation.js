import React, {Component} from 'react';
import { View, Text, TextInput } from 'react-native';
import { InputGroup, Input, Icon } from 'native-base';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import Card from '../../components/Card';
import Button from '../../components/Button';
import styles from './styles';

class ConfirmRecommendation extends Component {

  render() {

    const { unfinished, onSaveRecommendationPress } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Does this look right?</Text>
        <Card rec={unfinished} />
        <View style={styles.buttonContainer} >
          <Button bgcolor="green" text="Save" onPress={onSaveRecommendationPress} />
        </View>
      </View>
    );

  }

}

export default ConfirmRecommendation;
