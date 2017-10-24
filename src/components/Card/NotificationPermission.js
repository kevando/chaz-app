import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, Image  } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
// import moment from 'moment';
// import { Actions} from 'react-native-router-flux';

import { colors } from '../../config/styles';
import styles from './styles';
// import SetReminder from '../../components/SetReminder';
// import Button from '../../components/Button';
// const Permissions = require('react-native-permissions');


class NotificationPermission extends Component {

render() {
  const { onPress } = this.props;
  return (
    <View>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <View style={[styles.container]}>

          <View style={styles.iconContainer}>
            <Icon name="feather" color={colors.purple} size={25} />
          </View>

        <View style={styles.textContainer}>
          <View style={styles.recContainer}>
            <Text style={styles.recText}>Follow Up</Text>
          </View>
        </View>

      </View>
    </TouchableOpacity>

    </View>

  );
}

};

export default NotificationPermission;
