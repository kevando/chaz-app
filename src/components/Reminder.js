import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet  } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import _ from 'lodash'
import moment from 'moment'
import { colors, text, width, MARGIN_LEFT } from '../config/styles';

// import * as RecActions from '../reducers/recommendations/actions';
// import { connect } from 'react-redux';


// export const Categories = {
//   // "uncategorized" : {icon: "file-text", title: "Uncategorized"},
//   "movie" : {icon: "film", title: "Movie"},
//   "tv" : {icon: "tv", title: "TV Series"},
//   "book" : {icon: "book", title: "Book"},
//   "music" : {icon: "music", title: "Music"},
//   "podcast" : {icon: "mic", title: "Podcast"},
//   "documentary" : {icon: "video", title: "Documentary"},
//   "internet" : {icon: "link", title: "Internet"},
//   "other" : {icon: "zap", title: "Other"},
// }


// ---------------------------------------
//  Icon
// ---------------------------------------

// export const CategoryIcon = ({rec, category, size=25, color="purple"}) => {
//
//   const icon = !rec ? Categories[category].icon : rec.category ? Categories[rec.category].icon : 'file-text'
//   var iconColor = colors[color]
//
//   return <Icon name={icon} size={size} color={iconColor} />
// }
//

// ---------------------------------------
//  Display on Card Detail
// ---------------------------------------

export const Reminder = ({rec, size=22, color="yellow"}) => {
  const styles = {
    container: {
      marginTop: 5,
      flex: 1,
      flexDirection: 'row'
    },
    reminderText: {
      ...text,
      fontSize: 18,
      color: colors.orange,
      marginLeft: 10,
    }
  }
  // const icon = rec.category ? Categories[rec.category].icon : 'file-text'
  const iconColor = colors.orange
  const reminderText = moment(rec.reminder).fromNow()

  return (
    <View style={styles.container} >
      <Icon name={'clock'} size={size} color={iconColor} />
      <Text style={styles.reminderText}>{reminderText}</Text>
    </View>
  )
}
