
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Emoji from 'react-native-emoji';
import styles from './styles.js';

import Categories from '../../lib/Categories';

class RecCategory extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { category = 'uncategorized', onChange } = this.props;

    if(!onChange){
      // Just show the category
      return ( <Emoji name={Categories[category].icon} /> );

    } else {

      var displayOptions = [];
      for(var cat in Categories) {
        displayOptions.push(this.renderOption(Categories[cat]));
      }

      return(<View style={styles.optionsContainer}>{displayOptions}</View>);

    }
  }

  renderOption(cat){
    const {onChange} = this.props;
    return (
      <TouchableOpacity key={cat._id} onPress={onChange.bind(this,cat._id)}>
        <View style={[styles.option,this.getStyle(cat._id)]}>
          <Text style={styles.optionText}><Emoji name={cat.icon} /></Text>
          </View>
        </TouchableOpacity>
      );

  }
  getStyle(cat){
    if(cat == this.props.category)
      return {backgroundColor:'#ccc'}
  }

  // getOptions(){
  //   var options = [];
  //   this.props.categories.map(category => options.push(category.id));
  //   options.push('Cancel')
  //   options.shift(); // remove 'all' from list
  //   return options;
  // }
  //
  // onCategorySelect(category) {
  //   this.props.onChange(category);
  // }
  // onChangeCategoryPress() {
  //
  //   var options = this.getOptions();
  //
  //   ActionSheetIOS.showActionSheetWithOptions({
  //     title: 'Categorize this recommendation',
  //     options: options,
  //     cancelButtonIndex: options.length-1,
  //     destructiveButtonIndex: options.length-1,
  //   },
  //   (selectedIndex) => {
  //     if(selectedIndex < options.length-1){ // cancel
  //       this.onCategorySelect(options[selectedIndex])
  //     }
  //   });
  // }

}

export default RecCategory;
