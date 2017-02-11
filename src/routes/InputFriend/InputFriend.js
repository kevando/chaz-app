import React, {Component} from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { InputGroup, Input, Icon } from 'native-base';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import _ from 'lodash';

import styles from './styles';

class InputFriend extends Component {

  componentDidMount() {
    this._title._textInput.focus();
  }

  render() {

    const { onKeyPress, renderButton, friends, onFriendPress } = this.props;

    return (
      <View style={styles.container}>
        <InputGroup >
          <Input
            placeholder='Who recommended this?'
            ref={ c => this._title = c }
            autoCapitalize="none"
            autoCorrect={false}
            multiline={false}
            style={styles.input}
            onChangeText={(friend) => onKeyPress(friend)}
          />
        </InputGroup>

        <ScrollView keyboardShouldPersistTaps="always" style={styles.friendsContainer}>
          { _.map(friends, function({name},i) {
            return (
              <TouchableOpacity key={i} onPress={onFriendPress.bind(this,name)}>
                <Text style={styles.friend}>{name}</Text>
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
