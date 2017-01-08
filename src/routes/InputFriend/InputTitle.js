import React, {Component} from 'react';
import { View, Text, TextInput } from 'react-native';
import { Container, Content, InputGroup, Input, Icon, Button } from 'native-base';

import Routes from '../../config/routes';

var dismissKeyboard = require('dismissKeyboard');


class InputTitle extends Component {

  componentDidMount() {
    this._title._textInput.focus();
  }

  render() {


    const { navigator, onNextPress, updateState, unfinished } = this.props;

    return (
      <View>
        <InputGroup>

          <Input
            placeholder='How should I spend my time?'
            ref={ c => this._title = c }
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
            style={{backgroundColor:'yellow',height:110}}
            onChangeText={(title) => updateState({title})}
          />
        </InputGroup>


        <Text>unfinished: {unfinished.title}</Text>
        <Button info style={{backgroundColor:'red',marginTop:100}} onPress={onNextPress}>New Rec</Button>


            </View>
    );

  }


}

export default InputTitle;
