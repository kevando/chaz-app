import React, {Component} from 'react';
import {View, Text, Button, Keyboard, StyleSheet,StatusBar, ScrollView } from 'react-native';
import { colors, text } from '../../config/styles';
import { Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';

import _ from 'lodash'

// --------------------------------
// Close Button for InputTitle

export default class Filter extends Component {
  constructor(props) {
    super(props)
    // this.state = {selected: 'everything'}
    this._getFilterStyle = this._getFilterStyle.bind(this)
    // this._onFilterPress = this._onFilterPress.bind(this)
  }


  _getFilterStyle(filterItem) {
    if(filterItem === this.props.activeFilter)
      return {color: colors.black, textDecorationLine: 'underline'}
  }

  render() {
    return null
    const { changeActiveFilter, activeFilter } = this.props
    // return (
    //   <ScrollView style={styles.container} horizontal>
    //     <Text onPress={()=> changeActiveFilter('Everything')} style={[styles.filterItem,this._getFilterStyle('Everything')]}>Everything</Text>
    //     {
    //       _.map(Categories, (category,key) => {
    //         return <Text key={key} onPress={()=> changeActiveFilter(category.title)} style={[styles.filterItem,this._getFilterStyle(category.title)]}>{category.title}</Text>
    //       })
    //     }
    //
    //   </ScrollView>
    // )
  }
}
//

const styles = StyleSheet.create({

  container: {
    // flex: 1,
    // backgroundColor: 'yellow',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  filterItem: {
    ...text,
    color: colors.darkGrey,
    fontWeight: '500',
    fontSize: 15,
    marginRight: 10,
  }

});
