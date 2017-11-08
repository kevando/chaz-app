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
      fontSize: 38,
    },
    1: {
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
      question: null,
      // inviter: null,
    }
  }

  _saveName = () => {

    this.refs.INPUT.textDance(800)
    const { name } = this.state

    this.props.checkForInvitesByName(name)

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

  _startWithChaz = () => {
    this.props.startWithChaz((this.state.friendName))
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
    const { question, nameSaved } = this.state
    const { user } = this.props

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



        { nameSaved && user.myInvites && user.myInvites.length > 0 && !question &&
          <Animatable.View animation="fadeInUp" >
            <Text style={styles.subTitle}>Welcome.</Text>
            <Text style={styles.paragraph}>Did {user.myInvites[0].from.displayName} tell you about chaz?</Text>
            <View style={styles.buttonContainer}>
              <Button ghost text="Yes" onPress={()=>this.setState({question:'Did they explain it well?',friendName: user.myInvites[0].from.displayName})}/>
              <Button ghost text="No" onPress={()=>this.setState({question:'Did anyone tell you about chaz?'})}/>
            </View>
            </Animatable.View>
        }
        { nameSaved && user.myInvites && user.myInvites.length == 0 && !question &&
            <Animatable.View animation="fadeInUp" >
              <Text style={styles.subTitle}>Welcome.</Text>
              <Text style={styles.paragraph}>Do you know how chaz works?</Text>
              <View style={styles.buttonContainer}>
                <Button ghost text="Yes" onPress={()=>this.setState({question:'What is something someone recommended?'})}/>
                <Button ghost text="No" onPress={()=>this.setState({question:'Did anyone tell you about chaz?'})}/>
              </View>
              </Animatable.View>
          }



        { nameSaved && question == 'Did they explain it well?' &&
          <Animatable.View animation="fadeInUp" >
            <Text style={styles.subTitle}>Wonderful.</Text>
            <Text style={styles.paragraph}>{question}</Text>
            <View style={styles.buttonContainer}>
              <Button ghost text="Yes" onPress={()=>this.setState({question:'What is something they recommended to you?'})}/>
              <Button ghost text="No" onPress={()=>alert('Well call them and ask them to explain it')}/>
            </View>
            </Animatable.View>
        }
        { this.state.nameSaved && question == 'What is something someone recommended?' &&
          <Animatable.View animation="fadeInUp" >
            <Text style={styles.subTitle}>Wonderful.</Text>
            <Text style={styles.paragraph}>{question}</Text>
            <CategoryPicker callback={this._selectCategory} />
            </Animatable.View>
        }
        { this.state.nameSaved && question == 'What is something they recommended to you?' &&
          <Animatable.View animation="fadeInUp" >
            <Text style={styles.subTitle}>Awesome.</Text>
            <Text style={styles.paragraph}>{question}</Text>
            <CategoryPicker callback={this._selectCategory} />
          </Animatable.View>
        }

        { this.state.nameSaved && question == 'Did anyone tell you about chaz?' &&
          <Animatable.View animation="fadeInUp" >
            <Text style={styles.subTitle}>hmmm.</Text>
            <Text style={styles.paragraph}>{question}</Text>
            <View style={styles.buttonContainer}>
              <Button ghost text="Yes" onPress={this._startWithChaz}/>
              <Button ghost text="No" onPress={()=>alert('well how did you get here??')}/>
            </View>
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
