import React, { Component } from 'react';
import { View, StatusBar ,Text, TextInput, ScrollView} from 'react-native';
// import Hello from './Hello'
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'
// import firebase from 'react-native-firebase';
import styles from './styles';
import { colors } from '../../config/styles'
import { Button } from '../../components/Generic';
import { CategoryPicker } from '../../components/Category';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as Animatable from 'react-native-animatable';

NameInput = Animatable.createAnimatableComponent(TextInput);

Animatable.initializeRegistryWithDefinitions({
  textDance: {
    0: {
      borderBottomColor: 'rgba(255,255,255,0.4)',
      color: 'rgba(255,255,255,0.8)',
      fontSize: 35,
    },
    0.4: {
      borderBottomColor: 'rgba(255,255,255,0)',
      color: 'rgba(255,255,255,1.0)',
      fontSize: 35,
    },
    0.7: {
      // borderBottomColor: 'rgba(255,255,255,0)',
      // color: 'rgba(255,255,255,1.0)',
      fontSize: 38,
    },
    1: {
      // borderBottomColor: 'rgba(255,255,255,0)',
      // color: 'rgba(255,255,255,1.0)',
      fontSize: 35,
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
      takeTour: false,
      getStarted: false,
    }
  }

  _saveName = () => {
    this.refs.INPUT.textDance(800)
    const { name } = this.state
    this.props.saveDisplayName(name)
      .then(response => {
        // this.refs.INPUT.textDance(800) too much delay
        this.setState({nameSaved: true,name: name+','})
      })
      .catch(error => console.warn('updateProfile err', error.message))

  }

  _selectCategory = (category) => {
    this.setState({category})
    // possibly run an animation before this
    this.props.onNewRecPress(category)
  }

  // _explore = () => {
  //   this.refs.WELCOME.fadeOutLeft().then(this.setState({explore:true}))
  // }
  //
  // _getStarted = () => {
  //   this.refs.WELCOME.fadeOutUp().then(this.setState({getStarted:true}))
  // }

  render() {
    // console.log(this.props.user)
    // const { }

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" hidden={true} />
          <ScrollView>
            <Animatable.View style={styles.greetingContainer} ref="GREETING">
              <Text style={styles.greetingText}>Hello</Text>

                <NameInput
                  placeholder=''
                  ref="INPUT"
                  autoCapitalize="words"
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
            <Text style={styles.subTitle}>Welcome to chaz.</Text>
            <Text style={styles.paragraph}>What is the most recent thing someone recommended to you?</Text>
            <CategoryPicker callback={this._selectCategory} />
            </Animatable.View>
        }

</ScrollView>
        {this.state.name != '' && !this.state.nameSaved && <Button animated text="Yep. That's my name" onPress={this._saveName} />}

        {!this.state.name && <Animatable.Text animation="fadeIn" delay={10000} style={{color:'white',fontSize:12,}}>What's your name?</Animatable.Text>}
        <KeyboardSpacer />

      </View>
    );
    }

}

export default HelloContainer;
