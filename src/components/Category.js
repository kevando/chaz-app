import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView  } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
// import Emoji from 'react-native-emoji'
// var Emoji = require('react-native-emoji');
import _ from 'lodash'
import { colors, text, width, MARGIN_LEFT } from '../config/styles';

import * as RecActions from '../reducers/recommendations/actions';
import { connect } from 'react-redux';

import * as Animatable from 'react-native-animatable';




// ---------------------------------------
//    EMOJI
// ---------------------------------------

export const CategoryEmoji = ({category, categories, size=25 }) => {
  // console.warn(category)
  // return null


  const emoji = category && category.emoji || '❓'

  const styles = {
    fontSize: size,
  }
  return <Text style={styles} >{emoji}</Text>

  // Old icon code

  // return <Icon name={icon} size={size} color={iconColor} />
}



// ---------------------------------------
//  Display on Card Detail
// ---------------------------------------

export const Category = ({category, size=18, color="yellow"}) => {
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
  // const icon = rec.category ? Categories[rec.category].icon : 'file-text'
  // const iconColor = colors[color]
  const categoryTitle = category.title || ''

  return (
    <View style={styles.container} >
      <CategoryEmoji category={category} size={size} />
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
      this.props.dispatch(RecActions.updateRec(rec.id,{category}))
    } else {
      // this is a new rec so we need to run the callback fn too
      // this.props.dispatch(RecActions.setCategory(category))
      callback(category)
    }

  }


  render() {
    // console.warn('wtf')
    // alert('bals')
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
    console.warn('wtf')

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollViewContainer}>
        {
          _.map(Categories, (Category,category) => {
            return (
              <View style={styles.iconContainer} key={category} >
              <TouchableOpacity style={styles.touchContainer} onPress={() => this._onCategoryPress(category)}>
                <View style={[styles.iconCircle,{backgroundColor: category == c ? colors.turquoise : colors.white, borderColor: category == c ? colors.turquoise : colors.white}]}>

                  <CategoryIcon category={category} size={20} />

              </View>
              <View style={styles.textContainer}>
                <Text style={styles.categoryText}>{Category.title}</Text>
                </View>
              </TouchableOpacity>
              </View>
            )
          })
        }

      </ScrollView>
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
      // RecActions.updateRec(rec.id,{category: updatedCategory}) // right now this is the recView state
      this.props.dispatch(RecActions.updateRec(rec.id,{category: updatedCategory}))
    } else {
      // we are adding a new category
    }

    if(saveImmediately) {
      // From details page and no cat existed

      this.props.dispatch(RecActions.updateRec(rec.id,{category: updatedCategory}))
      // Bug doesnt refresh UI

    }

  }


  render() {

    const {category, rec, categories} = this.props

    // console.warn(rec.category)
    // console.log(this.props)
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollViewContainer}>
        {
          _.map(categories, (c,key) => {
            return (
              <View style={styles.iconContainer} key={key} >
              <TouchableOpacity activeOpacity={1.0} style={styles.touchContainer} onPress={() => this._onCategoryPress(c)}>
                <View style={[styles.iconCircle,{backgroundColor: rec.category && rec.category.title == c.title ? colors.turquoise : colors.white, borderColor: rec.category == c ? colors.turquoise : colors.white}]}>
                  <CategoryEmoji category={c} categories={categories} size={20} />
                </View>

              </TouchableOpacity>
              </View>
            )
          })
        }

      </ScrollView>
    );
  }

};

const mapStateToProps = (state) => {

  return {
    categories: state.categories,
  };
};


export const CategoryPickerEditing = connect(mapStateToProps, null)(CategoryPickerComponentEditing)

const ICON_CONTAINER = 70 //width / 6
const ICON_WIDTH = 50//ICON_CONTAINER - 10

const styles = StyleSheet.create ({
  scrollViewContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 0,
    // flexWrap: 'wrap',
    // borderWidth: 0,
    // borderColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'space-between', // v
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
    backgroundColor: colors.white,
    borderColor: colors.white,
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



export const EmptyCategory = ({size=30, iterationCount=3, delay=100, animation="rubberBand"}) => {


  return  (
  <Animatable.View animation={animation} duration={1000} delay={delay} iterationCount={iterationCount} style={{width: size, height: size, backgroundColor: colors.white, borderRadius: size, borderColor: colors.turquoise, borderWidth: 2 }} />

)

}
