
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
      // Just show the category (i dont think this is used anymore)
      return ( <Emoji name={Categories[category].icon} /> );

    } else {

      var displayOptions = [];
      for(var cat in Categories) {
        displayOptions.push(this.renderOption(Categories[cat]));
      }

      // remove uncategorized
      displayOptions.shift();

      return(<View style={styles.optionsContainer}>{displayOptions}</View>);

    }
  }

  renderOption(cat){
    const {onChange} = this.props;
    return (
      <TouchableOpacity key={cat._id} onPress={onChange.bind(this,cat._id)}>
        <View style={[styles.option,this.getStyle(cat._id)]}>
          <Text style={styles.icon}><Emoji name={cat.icon} /></Text>
          <Text style={styles.optionText}>{cat.label}</Text>
          </View>
        </TouchableOpacity>
      );

  }
  getStyle(cat){
    if(cat == this.props.category)
      return {backgroundColor:'#ccc'}
  }

}

export default RecCategory;
