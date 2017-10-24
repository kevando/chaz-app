import React, {Component} from 'react';
import { View, Text } from 'react-native';
import {ConfirmationCard} from '../../components/Card/Rec';
import Button from '../../components/Button';
import styles from './styles';

class ConfirmRecommendation extends Component {

  render() {
    const { unfinished, onSaveRecommendationPress, showTitle, friend } = this.props;

    return (
      <View style={styles.container}>
        {showTitle &&
          <Text style={styles.title}>Does this look right?</Text>
        }

        <ConfirmationCard friend={friend} rec={unfinished} />

        <View style={styles.buttonContainer} >
          <Button bgcolor="green" text="Save" onPress={onSaveRecommendationPress} />
        </View>
      </View>
    );

  }

}

export default ConfirmRecommendation;
