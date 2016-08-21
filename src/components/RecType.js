import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActionSheetIOS,
} from 'react-native';
import Emoji from 'react-native-emoji';



const emojiList_old = {
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
const emojiList = {
  default: "page_with_curl",
  book: "book",
  music: "minidisc",
  movie: "vhs",
}

const optionArray = [
  "book",
  "movie",
  "music",
  "cancel"
]

export default class RecType extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.rec.type)
    this.state = {type: this.props.rec.type || 'default'}
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onChangeTypePress.bind(this)}>
          <Text style={{fontSize:this.props.size,flexDirection:'row',textAlign:'center'}}>
            <Emoji name={emojiList[this.state.type]} />
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  onTypeSelect() {
    var newRec = this.props.rec;
    newRec.type = this.state.type; // might be a bad flow for perf
    this.props.updateRec(newRec);
  }
  onChangeTypePress() {
    if(!this.props.updateRec) // dont make this editable (hack)
      return;
    ActionSheetIOS.showActionSheetWithOptions({
      title: 'How would you categorize this?',
      options: optionArray,
      cancelButtonIndex: 3,
      destructiveButtonIndex: 3,
    },
    (selectedIndex) => {
      if(selectedIndex!=3){ // cancel
        this.setState({type: optionArray[selectedIndex]});
        this.onTypeSelect()
      }
    });

  }

}

const styles = StyleSheet.create({


});
