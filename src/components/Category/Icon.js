import React, { Component } from 'react';
import { Text, View, TouchableOpacity,  } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
// import _ from 'lodash'
import { colors } from '../../config/styles';

export const Categories = {
  // "uncategorized" : {icon: "file-text", title: "Uncategorized"},
  "movie" : {icon: "film", title: "Movie"},
  "tv" : {icon: "tv", title: "TV Series"},
  "book" : {icon: "book", title: "Book"},
  "music" : {icon: "music", title: "Music"},
  "other" : {icon: "zap", title: "Other"},
}




export const CategoryIcon = ({category, size=25, color="purple"}) => {
  const icon = category ? category.icon : 'file-text'
  var iconColor = colors[color]


  return <Icon name={icon} size={size} color={iconColor} />
}
