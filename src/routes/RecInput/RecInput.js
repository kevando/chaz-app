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
      collapseInput: false,
      // updateState: (state) => this.setState({state}),
    }
  }
  componentDidMount() {
    // if(Actions.currentScene == 'InputTitle')
      // this._title.focus()
  }

  saveTitle = () => {
    var collapaseDuration = 2000
    this.setState({collapaseInput: true})

    setTimeout(()=> {
      // this.setState({title: 'dude'})
      // this.props.setTitle()
    },collapaseDuration)

  }

  render() {

    const { updateState, renderButton, placeholderText, unfinished, setTitle } = this.props;

    return (
      <Animatable.View animation="bounceIn" duration={10} delay={0} style={styles.container}>

        <Unfinished {...this.state} {...this.props} updateState={updateState} unfinished={unfinished} />


        {!unfinished.title && <Button text="save title" onPress={this.saveTitle} /> }
        {unfinished.title && <Button text="save friend" onPress={Actions.pop} /> }
        <KeyboardSpacer />

      </Animatable.View>

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
