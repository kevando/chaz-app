import React, {Component} from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import styles from './styles';
import WidgetContainer from './WidgetContainer';

class TopFriends extends Component {

  render() {
    const { onPress, recrs} = this.props.data;

    if(recrs.length > 0){
      return (
        <WidgetContainer icon="smiley" title="Top Friends" >
          <TouchableOpacity onPress={onPress} >
            <View>
              {this.renderFriends()}
            </View>
          </TouchableOpacity>
        </WidgetContainer>
      );
    } else {
      return <View></View>
    }
  }

  renderFriends() {
    const { recrs } = this.props;
    var displayFriends = [];
    console.log('recrs',recrs)
    for(recr of recrs) {
      displayFriends.push(this.renderFriend(recr))
    }
    return displayFriends;
  }
  renderFriend(recr) {
    return(
      <View style={styles.recrContainer}>
        <Text style={{fontSize: 30}}><Emoji name="smiley" /></Text>
        <Text style={styles.recrName}>{recr.name}</Text>
      </View>
    )
  }


}

export default TopFriends;
