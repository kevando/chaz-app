import React, { Component } from 'react';
import { Text, View, TouchableOpacity,  } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { Actions} from 'react-native-router-flux';

import { colors } from '../../config/styles';
import styles from './styles';
import { CategoryIcon } from '../../components/Category/Icon';
import Tooltip from '../../components/Tooltip';

class Card extends Component {

  _onCardPress() {
    if(this.props.unfinished) return; // dont allow expand if rec isnt saved
    Actions.push('RecView',{rec: this.props.rec})
  }

render() {
  const { rec, setStatus, setGrade, setReminder, notificationPermission, totalRecs } = this.props;
  return (
    <View>
      <TouchableOpacity onPress={this._onCardPress.bind(this)} activeOpacity={0.9}>
        <View style={[styles.container]}>

          <View style={styles.iconContainer}>
            <CategoryIcon category={rec.category} size={25} color="grey" />
          </View>

        <View style={styles.textContainer}>
          <View style={styles.recContainer}>
            <Text style={styles.recText}>{rec.title}</Text>
          </View>
        </View>

      </View>
    </TouchableOpacity>
    <View>
    {totalRecs == 1 && false &&
    <Tooltip text="^ Tap to expand" />
    }

    </View>

    </View>
  );
}


};

export default Card;
