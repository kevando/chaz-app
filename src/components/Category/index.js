import React, { Component } from 'react';
import { Text, View, TouchableOpacity,  } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import _ from 'lodash'
import { colors, text, width, MARGIN_LEFT } from '../../config/styles';

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

  _onCategoryPress = (category) => {
    const { rec, callback } = this.props

    if(rec) {
      // We are updating a rec
      const newRec = {...rec, category}
      this.props.dispatch(RecActions.updateRecommendation(newRec))
    } else {
      // this is a new rec so we need to run the callback fn too
      // this.props.dispatch(RecActions.setCategory(category))
      callback(category)
    }

  }


  render() {
    const { onCategoryPress } = this.props;

    // const ICON_CONTAINER = width / 6
    // const ICON_WIDTH = ICON_CONTAINER - 10

    // NOT USING BUT THIS WILL WORK GOOD FOR A GRID
    // const styles = {
    //   container: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     flexWrap: 'wrap',
    //     borderWidth: 0,
    //     borderColor: 'white',
    //     // alignItems: 'center',
    //     justifyContent: 'center', // v
    //
    //   },
    //   iconContainer: {
    //     marginHorizontal: 10,
    //     marginVertical: 20,
    //     padding: 1,
    //     // backgroundColor: 'yellow',
    //     // flex: 3,
    //     width: ICON_CONTAINER,
    //     height: ICON_CONTAINER,
    //   },
    //   touchContainer: {
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center', // v
    //     margin: 0,
    //     padding: 0,
    //     // backgroundColor: 'red',
    //   },
    //   iconCircle: {
    //     // flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'center', // v
    //
    //     margin: 0,
    //     padding: 0,
    //     // backgroundColor: 'blue',
    //     // borderColor: 'green',
    //     // borderWidth: 4,
    //     height: ICON_WIDTH,
    //     width: ICON_WIDTH,
    //     borderRadius: ICON_WIDTH,
    //   },
    // }
    const ICON_WIDTH = 40

    const styles = {
      container: {
        flex: 1,
        flexDirection: 'column',
        borderWidth: 0,
        borderColor: 'white',
        // alignItems: 'center',
        justifyContent: 'center', // v
        marginHorizontal: MARGIN_LEFT
      },
      iconContainer: {
        flex: 1,
        marginBottom: 10,
        alignItems: 'flex-start',
        justifyContent: 'center', // v
      },
      touchContainer: {
        flex: 1,
        flexDirection: 'row',
        // alignItems: 'flex-start',
        justifyContent: 'center', // v
        margin: 0,
        padding: 0,
        // backgroundColor: 'red',
      },
      iconCircle: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center', // v

        margin: 0,
        padding: 0,
        backgroundColor: colors.yellow,
        borderColor: colors.yellow,
        borderWidth: 4,
        width: ICON_WIDTH,
        height: ICON_WIDTH,
        borderRadius: ICON_WIDTH,
      },
      textContainer: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 5,
        paddingLeft: 10,
        borderBottomColor: 'rgba(255,255,255,0.3)',
        borderBottomWidth: 2,
        paddingBottom: 10,
        paddingTop: 10,
      },
      categoryText: {
        ...text,
        fontSize: 18,
        color: 'white',
        fontWeight: '100',
      }
    }

    // !rec means we are adding a new rec

    return (
      <View style={styles.container}>
        {
          _.map(Categories, (Category,category) => {
            return (
              <View style={styles.iconContainer} key={category} >
              <TouchableOpacity style={styles.touchContainer} onPress={() => this._onCategoryPress(category)}>
              <View style={styles.iconCircle}>

                  <CategoryIcon category={category} size={20} color="white" />

              </View>
              <View style={styles.textContainer}>
                <Text style={styles.categoryText}>{Category.title}</Text>
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
