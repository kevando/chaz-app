import React, { Component } from 'react';
import { Text, View, TouchableOpacity,  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { Actions} from 'react-native-router-flux';

import { colors } from '../../config/styles';
import styles from './styles';
import SetReminder from '../../components/SetReminder';
import Tooltip from '../../components/Tooltip';

const RecIcon = (props) => {
  const {status, grade, reminder} = props.rec;
  var icon = 'file-text-o';
  var color = colors.grey;
  // if(status == 'unfinished')  icon = '🗣';
  // if(status == 'new')         icon = '📃';
  if(reminder)                icon = 'clock-o';
  // if(grade === 1)             icon = '👍';
  // if(grade === -1)            icon = '👎';

  return <Icon name={icon} size={25} color={color} />
}
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
          <RecIcon rec={rec} />
        </View>

        <View style={styles.textContainer}>

          <View style={styles.recContainer}>
            <Text style={styles.recText}>{rec.title}</Text>
          </View>




        </View>

      </View>
    </TouchableOpacity>
    <View>
    {totalRecs == 1 && !this.state.expanded &&
    <Tooltip text="^ Tap to expand" />
    }

    </View>

    </View>
  );
}


};

export default Card;
