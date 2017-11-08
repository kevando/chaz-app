import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet  } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import _ from 'lodash'
import { colors, text, width, MARGIN_LEFT } from '../config/styles';

import * as RecActions from '../reducers/recommendations/actions';
import { connect } from 'react-redux';


export const Categories = {
  // "uncategorized" : {icon: "file-text", title: "Uncategorized"},
  "movie" : {icon: "film", title: "Movie", verb:'watch'},
  "tv" : {icon: "tv", title: "TV Series", verb:'watch'},
  "book" : {icon: "book", title: "Book", verb:'read'},
  "music" : {icon: "music", title: "Music", verb: 'listen to'},
  "podcast" : {icon: "mic", title: "Podcast", verb:'listen to'},
  "documentary" : {icon: "video", title: "Documentary", verb: 'watch'},
  "internet" : {icon: "link", title: "Website", verb: 'look into'},
  "app" : {icon: "speaker", title: "App", verb: 'download'},
  "other" : {icon: "file", title: "Other", verb: 'look into'},
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

export const Category = ({rec, size=18, color="yellow"}) => {
  const styles = {
    container: {
      flex: 1,
      flexDirection: 'row',
      marginTop: 10,
    },
    categoryText: {
      ...text,
      fontSize: 16,
      color: colors.grey,
      marginLeft: 8,
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




// ---------------------------------------
//  Category Picker
// ---------------------------------------

class CategoryPickerComponentEditing extends Component {

  _onCategoryPress = (updatedCategory) => {
    const { rec, callback, updateRec, category, saveImmediately } = this.props

    if(category) {
      // We are changing it
      updateRec({category: updatedCategory}) // right now this is the recView state
      // const newRec = {...rec, category}
      // this.props.dispatch(RecActions.updateRecommendation(newRec))
    } else {
      // we are adding a new category
      // this.props.dispatch(RecActions.setCategory(category))
      // callback(category)
    }

    if(saveImmediately) {
      // From details page and no cat existed
      const updatedRec = {...rec, category: updatedCategory}
      this.props.dispatch(RecActions.updateRecommendation(updatedRec))
      // Bug doesnt refresh UI

    }

  }


  render() {


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
                <Text style={[styles.categoryText,{color: this.props.category == category ? colors.yellow : 'grey'}]}>{Category.title}</Text>
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

export const CategoryPickerEditing = connect()(CategoryPickerComponentEditing)

const ICON_CONTAINER = 70 //width / 6
const ICON_WIDTH = 50//ICON_CONTAINER - 10

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 0,
    borderColor: 'white',
    // alignItems: 'center',
    justifyContent: 'space-between', // v
    // backgroundColor: 'red',

  },
  iconContainer: {
    marginHorizontal: 0,
    marginVertical: 2,
    padding: 1,
    // backgroundColor: 'yellow',
    // flex: 3,
    width: ICON_CONTAINER,
    height: ICON_CONTAINER,
  },
  touchContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // v
    margin: 0,
    padding: 0,
    // backgroundColor: 'blue',
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
    height: ICON_WIDTH,
    width: ICON_WIDTH,
    borderRadius: ICON_WIDTH,
  },
  categoryText: {
    ...text,
    fontSize: 8
  }
})
