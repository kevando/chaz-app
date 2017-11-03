import React, {Component} from 'react';
import { View, Text, TextInput, StatusBar, Keyboard, ScrollView, TouchableOpacity } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import _ from 'lodash'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
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



  _saveTitle = (inputHeight) => {


    var collapseDuration = 1000
    this.refs.CARD.transitionTo({height:90+inputHeight},collapseDuration) // hack
    this.props.setTitle()

  }

  // _onFriendPress = (friend) => {
  //   var collapseDuration = 800
  //
  //   this.refs.CARD.transitionTo({marginTop:38},collapseDuration) // hack
  //   //
  //   // this.props.updateState({})
  //   setTimeout(()=>{
  //
  //     this.refs.TITLE.fadeOutUp() // hack
  //     this.refs.BUTTON.fadeOutDown().then(()=>{
  //       this._throwParty()
  //     })
  //
  //   },collapseDuration)
  //
  //   const { setFriendId } = this.props;
  //   setFriendId(friend.id); // Redux
  //
  //   this.props.addRecommendation(); // Redux
  //   // Actions.pop() // might error
  //
  // }

  _setFriend = () => {
    var collapseDuration = 800

    this.refs.CARD.transitionTo({marginTop:38},collapseDuration) // hack
    //
    // this.props.updateState({})
    setTimeout(()=>{

      this.refs.TITLE.fadeOutUp() // hack
      this.refs.BUTTON.fadeOutDown().then(()=>{
        // this._throwParty()
        this.props.setFriend()
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
  _getTitleText = () => {
    const { walkthrough, category, unfinished, user} = this.props
    let titleText = 'what????'

    if(walkthrough && !unfinished.title)  titleText = `What ${category}?`;
    // if(walkthrosomeugh && !unfinished.title)  titleText = `What?`;
    if(unfinished.title) titleText = `Who told you?`;
    if(unfinished.from == user.uid) titleText = `What are you recommending?`;

    return titleText
  }


  render() {



    const { updateState, renderButton, placeholderText, onFriendPress, friends, unfinished, setTitle, walkthrough, category, inputHeight } = this.props;

    return (

      <Animatable.View  ref="CONTAINER" style={styles.container}>
        <StatusBar hidden={true} animated={true} />
        <Icon onPress={this._close} name="x" size={25} style={styles.closeButton} />


        <Animatable.View ref="TITLE">
          <Text style={styles.title}>{this._getTitleText()}</Text>
          </Animatable.View>

        <View style={styles.TOP}>
          <Animatable.View ref="CARD" style={[styles.CARD,{height: CARD_HEIGHT }]}>
            <GestureRecognizer
              onSwipe={(direction, state) => this.onSwipe(direction, state)}
              config={config}
              style={{
                flex: 1,
                backgroundColor: this.state.backgroundColor
              }} >

              <Unfinished {...this.props} />

            </GestureRecognizer>
          </Animatable.View>
        </View>



        {unfinished.title  &&
        <View keyboardShouldPersistTaps="always" style={styles.friendsContainer}>

          { _.map(friends, function(friend,i) {
            return (
              <TouchableOpacity key={i} onPress={() => onFriendPress(friend)} style={styles.friendTouchable}>
                <Text style={styles.friendText}>{friend.name}{friend.uid&&'!'}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      }




        <Animatable.View ref="BUTTON">

          {!unfinished.title && this.props.title !== '' && !unfinished.from && <Button text="Next" onPress={()=>this._saveTitle(inputHeight)} />}
          {unfinished.title && this.props.friendName !== '' && <Button text="Save" onPress={this._setFriend} /> }
          {!unfinished.title && this.props.title !== '' && unfinished.from &&  <Button text={`Send to ${unfinished.to_name}`} onPress={this._sendRec} /> }
        </Animatable.View>
        <KeyboardSpacer />
      </Animatable.View>



    )
  }


}

export default InputTitle;
