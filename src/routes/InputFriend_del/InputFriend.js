import React, {Component} from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

import styles from './styles';

class InputFriend extends Component {

  componentDidMount() {
    if(Actions.currentScene == 'InputFriend')
      this._title.focus()
  }

  render() {
    // console.log(this.props)

    const { onKeyPress, renderButton, friends, onFriendPress } = this.props;

    return (
      <View style={styles.container}>

          <TextInput
            placeholder='Who recommended this?'
            ref={ c => this._title = c }
            autoCapitalize="none"
            autoCorrect={false}
            multiline={false}
            style={styles.input}
            placeholderTextColor="#aaa"
            onChangeText={(friend) => onKeyPress(friend)}
          />


        <ScrollView keyboardShouldPersistTaps="always" style={styles.friendsContainer}>
          { _.map(friends, function(friend,i) {
            return (
              <TouchableOpacity key={i} onPress={onFriendPress.bind(this,friend)} style={styles.friendTouchable}>
                <Text style={styles.friendText}><Icon name='user' size={20} style={styles.friendIcon}/>&nbsp;&nbsp;{friend.name}{friend.uid&&'!'}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>


        { renderButton() }
        <KeyboardSpacer />
      </View>
    );

  }

}

export default InputFriend;
