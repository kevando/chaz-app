import React, {Component} from 'react';
import { View, Text, TextInput, StatusBar, Keyboard } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import * as Animatable from 'react-native-animatable'
import Unfinished from '../../components/Card/Unfinished'
import { Button } from '../../components/Generic';

class InputTitle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // collapseInput: false,
      // updateState: (state) => this.setState({state}),
    }
  }


  saveTitle = () => {

    // not good cause it
    this.refs.CARD.transitionTo({height:200},1200)
    this.props.setTitle()

  }

  render() {

    const { updateState, renderButton, placeholderText, unfinished, setTitle } = this.props;

    return (

      <View  style={styles.container}>
        <View style={styles.TOP}>
          <Animatable.View ref="CARD" style={styles.CARD}>
            <Unfinished {...this.props} />
          </Animatable.View>
        </View>

        {!unfinished.title && this.props.title !== '' && <Button text="Save Title" onPress={this.saveTitle} />}

        {unfinished.title && <Button text="save friend" onPress={this.props.setFriend} /> }

        <KeyboardSpacer />
      </View>



    )
  }

  render_og() {
    // console.log('inputtitle render',this.props)

    const { updateState, renderButton, placeholderText } = this.props;

    // return (<View style={{backgroundColor: 'yellow'}}><Text>dude</Text></View>)

    return (

      <Animatable.View animation="bounceIn" duration={500} delay={0} style={styles.container}>


          <TextInput
            placeholder={placeholderText}
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
      </Animatable.View>

    );

  }

}

export default InputTitle;
