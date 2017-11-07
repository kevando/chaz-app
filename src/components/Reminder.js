import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet  } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import _ from 'lodash'
import moment from 'moment'
import { colors, text, width, MARGIN_LEFT } from '../config/styles';


// ---------------------------------------
//  Display on Card Detail
// ---------------------------------------

export const Reminder = ({rec, size=18, color="yellow"}) => {
  if(moment().diff(rec.reminder) > 0) { return null } // IN THE PAST
  const styles = {
    container: {
      marginTop: 10,
      flex: 1,
      flexDirection: 'row'
    },
    reminderText: {
      ...text,
      fontSize: 16,
      color: colors.grey,
      marginLeft: 8,
    }
  }
  // const icon = rec.category ? Categories[rec.category].icon : 'file-text'
  const iconColor = colors.orange
  const reminderText = moment(rec.reminder).fromNow()

  return (
    <View style={styles.container} >
      <Icon name={'clock'} size={size} color={iconColor} />
      <Text style={styles.reminderText}>Follow up {reminderText}</Text>
    </View>
  )
}
