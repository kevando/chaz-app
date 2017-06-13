import React, {Component} from 'react';
import { View, Text, TextInput } from 'react-native';
import { InputGroup, Input, Icon } from 'native-base';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import styles from './styles';

class InputTitle extends Component {

  componentDidMount() {
    this._title._textInput.focus();
  }

  render() {

    const { updateState, renderButton, renderHeartman } = this.props;

    return (
      <View style={styles.container}>
        <InputGroup style={{flex:1,borderWidth:0}}>
          <Input
            placeholder='Type recommendation here'
            ref={ c => this._title = c }
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="#aaa"
            multiline={true}
            style={styles.input}
            onChangeText={(title) => updateState({title})}
          />
        </InputGroup>
        { renderHeartman() }
        { renderButton() }
        <KeyboardSpacer />
      </View>
    );

  }

}

export default InputTitle;
