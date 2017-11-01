import React, { Component } from 'react';
import { View, StatusBar ,Text, TextInput, ScrollView} from 'react-native';
import Hello from './Hello'
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'
// import firebase from 'react-native-firebase';
import styles from './styles';
import { Button, FancyButton } from '../../components/Generic';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as Animatable from 'react-native-animatable';

NameInput = Animatable.createAnimatableComponent(TextInput);

// const Content = ({contentIndex, contents}) => {
//   return contents[contentIndex]
// }

// const HelloInput = (props) => {
//   return (<Text style={styles.greetingText}>Hello____</Text>)
// }
//
// const HelloGreeting = (props) => {
//   return (<Text style={styles.greetingText}>Hello Kevin,</Text>)
// }


Animatable.initializeRegistryWithDefinitions({
  textDance: {
    0: {
      borderBottomColor: 'rgba(255,255,255,0.4)',
      color: 'rgba(255,255,255,0.6)',
    },
    0.3: {
      borderBottomColor: 'rgba(255,255,255,0)',
      color: 'rgba(255,255,255,0)',
    },
    0.8: {
      borderBottomColor: 'rgba(255,255,255,1.0)',
      color: 'rgba(255,255,255,1.0)',
    },
    1: {
      borderBottomColor: 'rgba(255,255,255,0)',
      color: 'rgba(255,255,255,1.0)',
    },
  }
});

class HelloContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      nameSaved: false,
      category: null,
      // contentIndex: 0,
      // contents: [
      //   <HelloInput />,
      //   <HelloGreeting />
      // ]
    }

  }

  _saveName = () => {
    this.refs.INPUT.textDance(2000)
      .then(()=> this.setState({nameSaved: true}))
    // this.refs.GREETING.flash()

  }

  _selectCategory = () => {
    this.setState({category: 'movie'})
    this.props.onNewRecPress()
  }

  render() {

    // const { }

    return (
      <View style={styles.CONTAINER}>
        <StatusBar barStyle="light-content" hidden={false} />
        <ScrollView>
        <Animatable.View style={styles.GREETING} ref="GREETING">
        <Text style={styles.greetingText}>Hello</Text>

        <NameInput
          placeholder=''
          ref="INPUT"
          autoCapitalize="none"
          value={this.state.name}
          autoCorrect={false}
          autoFocus={true}
          placeholderTextColor="#aaa"
          multiline={false}
          style={styles.inputName}
          onChangeText={(name) => this.setState({name})}
          caretHidden={false}
          selectionColor={'rgba(255,255,255,0.4)'}
          editable={!this.state.nameSaved}
        />
        </Animatable.View>


        { this.state.nameSaved &&
          <Animatable.View animation="fadeInUp" >
            <Text style={styles.paragraph}>Welcome to chaz.</Text>
            <Text style={styles.paragraph}>Has anyone recommended something to you lately?</Text>

            <Text style={styles.paragraph} onPress={this._selectCategory}>Yes, a MOVIE</Text>
            </Animatable.View>
        }

</ScrollView>
        {this.state.name != '' && !this.state.nameSaved && <FancyButton text="That's my name" onPress={this._saveName} />}


        <KeyboardSpacer />

      </View>
    );
    }

}

export default HelloContainer;
