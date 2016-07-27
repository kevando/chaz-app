import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Emoji from 'react-native-emoji'

const emojiList = {
  all: "earth_americas",
  default: "page_with_curl",
  book: "book",
  video: "film_projector",
  music: "minidisc",
  food: "ramen",
  video: "ramen",
  audio: "ramen",
  podcast: "radio",
  tv: "tv",
  movie: "vhs",
  location:"repeat"

}

export default class RecType extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text style={{fontSize:this.props.size,flexDirection:'row',textAlign:'center'}}>
        <Emoji name={emojiList[this.props.type]} />
      </Text>
    );
  }

}
