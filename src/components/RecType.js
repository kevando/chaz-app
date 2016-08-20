import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Emoji from 'react-native-emoji';


const DropDown = require('react-native-selectme');
const {
  Select,
  Option,
  OptionList,
  updatePosition
} = DropDown;

const emojiList = {
  all: "earth_americas",
  default: "page_with_curl",
  book: "book",
  video: "film_projector",
  music: "minidisc",
  food: "ramen",
  podcast: "radio",
  tv: "tv",
  movie: "vhs",
  app: "iphone",
  place: "desert_island",


}

export default class RecType extends Component {
  constructor(props) {
    super(props);
    this.state = {type: this.props.rec.type || '?'}
  }


  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }

  _type(type) {

    this.setState({
      ...this.state,
      type: type
    });
    var newRec = this.props.rec;
    newRec.type = type;
    this.props.updateRec(newRec);
  }


  render() {
    return (
      <View style={styles.container}>
          <Select
            ref="SELECT1"
            optionListRef={this._getOptionList.bind(this)}
            defaultValue={this.state.type}
            style={styles.select}
            onSelect={this._type.bind(this)}>
            <Option style={styles.option}>Movie</Option>
            <Option style={styles.option}>Podcast</Option>

          </Select>

          <OptionList ref="OPTIONLIST" />
</View>

    );
  }


}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff',
    flex:1,
  },
  select: {

    borderWidth: 0
    // position: 'absolute',
    // left: 0,
    // top: 0,
    // opacity: 0.5,
    // backgroundColor: 'blue',
    // width: 300
  },
  option: {
    flex: 1,
    // position: 'absolute',
    // left: 0,
    // top: 0,
    // opacity: 0.5,
    backgroundColor: 'red',
    // justifyContent:'start'

    // width: 250
  },
  optionList: {
    // backgroundColor:'green'
  }
});
