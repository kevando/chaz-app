import React, {Component} from 'react';
import { View, Text, TextInput, StatusBar, Keyboard } from 'react-native';
// import { InputGroup, Input, Icon } from 'native-base';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

class InputTitle extends Component {

  componentDidMount() {
    if(Actions.currentScene == 'InputTitle')
      this._title.focus()
  }


  render() {
    // console.log('inputtitle render',this.props)

    const { updateState, renderButton, renderHeartman } = this.props;

    return (

      <View style={styles.container}>
        <StatusBar hidden={true} />

          <TextInput
            placeholder='Type recommendation here'
            ref={ c => this._title = c }
            autoCapitalize="none"
            value={this.props.title}
            autoCorrect={false}
            placeholderTextColor="#aaa"
            multiline={true}
            style={styles.input}
            onChangeText={(title) => updateState({title})}
          />
        { renderButton() }
        <KeyboardSpacer />
      </View>

    );

  }

}

export default InputTitle;
