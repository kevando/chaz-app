import React, {Component} from 'react';
import { View, Text, TextInput } from 'react-native';
import { InputGroup, Input, Icon } from 'native-base';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import styles from './styles';

class InputFriend extends Component {

  componentDidMount() {
    this._title._textInput.focus();
  }

  render() {

    const { updateState, renderButton } = this.props;

    return (
      <View style={styles.container}>
        <InputGroup style={{flex:1}}>
          <Input
            placeholder='Who recommended this?'
            ref={ c => this._title = c }
            autoCapitalize="none"
            autoCorrect={false}
            multiline={false}
            style={styles.input}
            onChangeText={(friend) => updateState({friend})}
          />
        </InputGroup>
        { renderButton() }
        <KeyboardSpacer />
      </View>
    );

  }

}

export default InputFriend;
