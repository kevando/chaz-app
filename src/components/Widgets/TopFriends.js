import React, {Component} from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import styles from './Styles';
import WidgetContainer from './WidgetContainer';
import Emoji from 'react-native-emoji';

class TopFriends extends Component {

  render() {
    const { recrs} = this.props.data;

    if(recrs.length > 0){
      return (
        <WidgetContainer icon="smiley" title="Top Friends" >

            <View style={styles.recrContainer}>
              {this.renderFriends()}
            </View>

        </WidgetContainer>
      );
    } else {
      return <View></View>
    }
  }

  renderFriends() {
    const { recrs } = this.props.data;
    var displayFriends = [];
    console.log('recrs',recrs)
    for(recr of recrs) {
      displayFriends.push(this.renderFriend(recr))
    }
    return displayFriends;
  }
  renderFriend(recr) {
    const { onPress} = this.props.data;
    return(
      <TouchableOpacity key={recr._id} onPress={onPress.bind(this,recr)} >
      <View style={styles.recrItem}>
        <Text style={{fontSize: 30}}><Emoji name="smiley" /></Text>
        <Text style={styles.recrName}>{recr.name}</Text>
      </View>
    </TouchableOpacity>
    )
  }


}

export default TopFriends;
