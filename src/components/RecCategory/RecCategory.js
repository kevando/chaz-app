
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActionSheetIOS,
} from 'react-native';
import Emoji from 'react-native-emoji';

import { connect } from 'react-redux';


const emojiList = {
  uncategorized: "paperclip",
  all: "earth_americas",
  default: "page_with_curl",
  book: "book",
  music: "minidisc",
  food: "ramen",
  podcast: "radio",
  tv: "tv",
  movie: "vhs",
  app: "phone",
  place: "desert_island",
}


class RecCategory extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const { category = 'uncategorized', onChange } = this.props;

    if(!onChange){
      // Just show the category
      return ( <Emoji name={emojiList[category]} /> );

    } else {
      // a function was passed, so give the user a selector
      // Might want to expand this out in the future
      return (
        <TouchableOpacity onPress={this.onChangeCategoryPress.bind(this)}>
          <Text ><Emoji name={emojiList[category]} /> - {category}</Text>
        </TouchableOpacity>
      );
    }
  }

  getOptions(){
    var options = [];
    this.props.categories.map(category => options.push(category.id));
    options.push('Cancel')
    options.shift(); // remove 'all' from list
    return options;
  }

  onCategorySelect(category) {
    this.props.onChange(category);
  }
  onChangeCategoryPress() {

    var options = this.getOptions();

    ActionSheetIOS.showActionSheetWithOptions({
      title: 'Categorize this recommendation',
      options: options,
      cancelButtonIndex: options.length-1,
      destructiveButtonIndex: options.length-1,
    },
    (selectedIndex) => {
      if(selectedIndex < options.length-1){ // cancel
        this.onCategorySelect(options[selectedIndex])
      }
    });
  }

}
function mapStateToProps(state) {
  return {
    categories: state.categories,
  };
}

export default connect(mapStateToProps)(RecCategory);
