import React, { Component } from 'react';
import { Text, View, TouchableOpacity,  } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import _ from 'lodash'
import { colors, text } from '../../config/styles';

import * as RecActions from '../../reducers/recommendations/actions';
import { connect } from 'react-redux';


export const Categories = {
  // "uncategorized" : {icon: "file-text", title: "Uncategorized"},
  "movie" : {icon: "film", title: "Movie"},
  "tv" : {icon: "tv", title: "TV Series"},
  "book" : {icon: "book", title: "Book"},
  "music" : {icon: "music", title: "Music"},
  "podcast" : {icon: "mic", title: "Podcast"},
  "documentary" : {icon: "video", title: "Documentary"},
  "internet" : {icon: "link", title: "Internet"},
  "other" : {icon: "zap", title: "Other"},
}


// ---------------------------------------
//  Icon
// ---------------------------------------

export const CategoryIcon = ({rec, category, size=25, color="purple"}) => {

  const icon = !rec ? Categories[category].icon : rec.category ? Categories[rec.category].icon : 'file-text'
  var iconColor = colors[color]

  return <Icon name={icon} size={size} color={iconColor} />
}


// ---------------------------------------
//  Display on Card Detail
// ---------------------------------------

export const Category = ({rec, size=22, color="yellow"}) => {
  const styles = {
    container: {
      flex: 1,
      flexDirection: 'row'
    },
    categoryText: {
      ...text,
      fontSize: 18,
      color: colors.yellow,
      marginLeft: 10,
    }

  }
  const icon = rec.category ? Categories[rec.category].icon : 'file-text'
  const iconColor = colors[color]
  const categoryTitle = rec.category ? Categories[rec.category].title : 'Unknown'

  return (
    <View style={styles.container} >
      <Icon name={icon} size={size} color={iconColor} />
      <Text style={styles.categoryText}>{categoryTitle}</Text>
    </View>
  )
}


// ---------------------------------------
//  Category Picker
// ---------------------------------------

class CategoryPickerComponent extends Component {

  _onCategoryPress = (rec,category) => {
    rec.category = 'movie'
    // console.log(this.props)
    this.props.dispatch(RecActions.updateRecommendation(rec))
    // this.props.updateRecommendation(rec)
  }


  render() {
    const { rec, onCategoryPress } = this.props;
    return (
      <View style={styles.pickerContainer}>
        {
          _.map(Categories, (category,i) => {
            return (
              <View style={styles.categoryTouchable} key={i} >
              <TouchableOpacity onPress={() => this._onCategoryPress(rec,category)}>
              <View style={styles.textContainer}>
                <View style={styles.recContainer}>
                  <Text style={styles.categoryOptionText}><CategoryIcon category={i} size={16} color="blue" />&nbsp;{category.title}</Text>
                </View>
              </View>
              </TouchableOpacity>
              </View>
            )
          })
        }

      </View>
    );
  }

};

export const CategoryPicker = connect()(CategoryPickerComponent)
