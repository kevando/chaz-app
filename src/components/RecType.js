import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActionSheetIOS,
} from 'react-native';
import Emoji from 'react-native-emoji';



const emojiList = {
  all: "earth_americas",
  default: "page_with_curl",
  other: "page_with_curl",
  book: "book",
  video: "film_projector",
  music: "minidisc",
  food: "ramen",
  podcast: "radio",
  tv: "tv",
  movie: "vhs",
  // app: "iphone",
  place: "desert_island",
}


export default class RecType extends Component {
  constructor(props) {
    super(props);
    // console.log('recType type in constructor',this.props.rec.type)
    this.state = {type: this.props.rec.type || 'default', options:this.getOptions()}
    this.getOptions = this.getOptions.bind(this)
  }

  componentWillReceiveProps(newProps) {
    // user edited type so the list item needs to be refreshed
    this.setState({type: newProps.rec.type  || 'default' }); // todo should have a better way to handle undefined types
  }
  getOptions(){
    if(!this.props.updateRec) // if set to uneditable(hack)
      return;

    var options = this.props.filters
    options.push('Cancel')
    options.shift(); // remove 'all' from list
    return options;
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
    if(!this.props.updateRec) // if set to uneditable(hack)
      return;

    var {options}=this.state;

    ActionSheetIOS.showActionSheetWithOptions({
      title: 'Categorize this recommendation',
      options: options,
      cancelButtonIndex: options.length-1,
      destructiveButtonIndex: options.length-1,
    },
    (selectedIndex) => {
      if(selectedIndex < options.length-1){ // cancel
        this.setState({type: options[selectedIndex]});
        this.onTypeSelect()
      }
    });
  }

}

const styles = StyleSheet.create({


});
