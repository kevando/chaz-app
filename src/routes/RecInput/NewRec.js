import React, {Component} from 'react';
import { View, Text, TextInput, StatusBar, Keyboard } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import * as Animatable from 'react-native-animatable'
import Unfinished from '../../components/Card/Unfinished'
import { Button } from '../../components/Generic';
import { CategoryIcon } from '../../components/Category';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

CARD_HEIGHT = 220

Animatable.initializeRegistryWithDefinitions({
  throwParty: {
    0: {
      shadowColor: 'blue',
      shadowRadius: 0,
      shadowOpacity: 0,
      scale: 1,
    },
    0.2: {
      shadowColor: 'blue',
      shadowRadius: 0,
      shadowOpacity: 0,
      scale: 1.05,
    },
    0.3: {
      shadowColor: 'blue',
      shadowRadius: 0,
      shadowOpacity: 1.0,
      scale: 1,
    },
    0.8: {
      shadowColor: 'blue',
      shadowRadius: 20,
      shadowOpacity: 0.6,
      scale: 1,
    },
    1: {
      shadowColor: 'blue',
      shadowRadius: 40,
      shadowOpacity: 0,
      scale: 1,
    },
  }
});

const config = {
  // Velocity that has to be breached in order for swipe to be triggered (vx and vy peroperties of gestureState)
  velocityThreshold: 0.3,
  // Absolute offset that shouldn't be breached for swipe to be triggered (dy for horizontal swipe, dx for vertical swipe)
  directionalOffsetThreshold: 80
};

class InputTitle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // collapseInput: false,
      // updateState: (state) => this.setState({state}),
    }
  }


  saveTitle = (inputHeight) => {
    var collapseDuration = 1000
    // const { inputHeight } = this.props
    // console.log(inputHeight)
    // {height:90+inputHeight},
    this.refs.CARD.transitionTo({height:90+inputHeight},collapseDuration) // hack
    this.props.setTitle()

  }

  _setFriend = () => {
    var collapseDuration = 800

    this.refs.CARD.transitionTo({marginTop:38},collapseDuration) // hack
    //
    // this.props.updateState({})
    setTimeout(()=>{

      this.refs.TITLE.fadeOutUp() // hack
      this.refs.BUTTON.fadeOutDown().then(()=>{
        this._throwParty()
      })

    },collapseDuration)


  }
  _throwParty = () => {
    // console.log(this.refs.CARD)
    this.refs.CARD.throwParty(700).then(()=> {
      this.refs.CONTAINER.fadeOut(200).then(()=>{
        this.props.setFriend() // this is bad to have here cause we are assuming everything saved properly before we know it did
        Actions.pop()
      })
    })

  }

  _closeLightbox = () => {
    // this.props.updateState({hideKeyboard: 'yes now'})
    Keyboard.dismiss()
    this.refs.CARD.fadeOutDown(200)
    this.refs.TITLE.fadeOutDown(200)
    this.refs.BUTTON.fadeOutDown(200).then(()=>{
      this.refs.CONTAINER.fadeOut(400).then(()=>{
        Actions.pop()
      })
    })

    // Actions.pop()
  }

  _close = () => {
    this._closeLightbox()
  }


    onSwipe = (gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    console.log('gesture',gestureName);
    switch (gestureName) {
      case SWIPE_UP:
        // this.setState({backgroundColor: 'red'});
        break;
      case SWIPE_DOWN:
        // this.setState({backgroundColor: 'green'});
        Actions.pop()
        break;
      case SWIPE_LEFT:
        // this.setState({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        // this.setState({backgroundColor: 'yellow'});
        break;
    }
  }


  render() {



    const { updateState, renderButton, placeholderText, unfinished, setTitle, walkthrough, category, inputHeight } = this.props;

    return (

      <Animatable.View  ref="CONTAINER" style={styles.CONTAINER}>
        <StatusBar hidden={true} animated={true} />
        <Text onPress={this._close} style={{zIndex: 999, position:'absolute',top: 0, color: 'white', right: 10,backgroundColor: 'transparent',padding:10}}>Close</Text>
        <Animatable.View ref="TITLE">
          {walkthrough && !unfinished.title && <Text style={styles.title}>What {category}?</Text>}
          {!walkthrough && !unfinished.title && <Text style={styles.title}>What?</Text>}
          {unfinished.title && <Text style={styles.title}>Who told you?</Text>}
          </Animatable.View>
        <View style={styles.TOP}>
          <Animatable.View ref="CARD" style={[styles.CARD,{height: CARD_HEIGHT }]}>
          <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}

        config={config}
        style={{
          flex: 1,
          backgroundColor: this.state.backgroundColor
        }}
        >
            <Unfinished {...this.props} />
            </GestureRecognizer>
          </Animatable.View>
        </View>


        <Animatable.View ref="BUTTON">
        {!unfinished.title && this.props.title !== '' && <Button text="Next" onPress={()=>this.saveTitle(inputHeight)} />}

        {unfinished.title && this.props.friendName !== '' &&<Button text="Save" onPress={this._setFriend} /> }
        </Animatable.View>
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
