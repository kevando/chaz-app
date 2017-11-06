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
import { colors } from '../../config/styles'

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
  },
  fadeBackground: {
    from: {backgroundColor: 'rgba(92,127,252,1.0)'},
    to: {backgroundColor: 'rgba(92,127,252,0)'},
    // to:   {backgroundColor: 'transparent'}
  },

  fadeInBackground: {
    from: {backgroundColor: 'rgba(92,127,252,0)'},
    to: {backgroundColor: 'rgba(92,127,252,1.0)'},
  },

});



// const TitleView = () => {
//   return(
//     <Text style={styles.title}>TITLE_CONTAINER</Text>
//   )
// }
// TitleViewAnimated = Animatable.createAnimatableComponent(TitleView);

const config = {
  // Velocity that has to be breached in order for swipe to be triggered (vx and vy peroperties of gestureState)
  velocityThreshold: 0.3,
  // Absolute offset that shouldn't be breached for swipe to be triggered (dy for horizontal swipe, dx for vertical swipe)
  directionalOffsetThreshold: 80
};
const animationConfig = { // On Route Load
  CONTAINER: {delay: 0,   duration: 200, animation: "fadeInBackground"},
  TITLE:     {delay: 100, duration: 200, animation: "fadeInUp"},
  CARD:      {delay: 0, duration: 200, animation: "fadeInUp"},
  CLOSE:     {delay: 100, duration: 200, animation: "fadeInUp"},
}

class InputTitle extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  // componentDidMount() {}

  _onSavePress = () => {

    // this._saveSuccessPreAnimation()

    this.props.addFriendRedux(this.props.friendName)
      .then(friend => this.props.setFriendRedux(friend))
      .then(friend => this._saveRec() )
      .catch(error => console.warn('add friend redux error',error))
  }

  _setFriend = (friend) => {

    // this._saveSuccessPreAnimation()

    this.props.setFriendRedux(friend)
      .then(friend => this._saveRec() )
      .catch(error => console.warn('set friend redux error',error))
  }

  _saveRec = () => {
    this._saveSuccessPreAnimation()
    this.props.saveRecRedux()
      // .then(rec => this._saveSuccessPreAnimation(rec))
      .catch(error => console.warn('save rec redux error',error))
  }


  _saveSuccessPreAnimation = () => {
    Keyboard.dismiss()
    this.refs.TITLE.fadeOutUp(200)
    this.refs.CLOSE.fadeOutUp(200)

    this.refs.CONTAINER.fadeBackground(200)
    this.refs.CARD.transitionTo({marginTop:27},400)
    this.refs.FRIENDS.fadeOutDown(200)//.then(()=> {
    //   this.refs.CONTAINER.fadeBackground(200)
    // })
    this.refs.BUTTON.fadeOutDown(400).then(Actions.pop)
  }



  _closeLightbox = () => {

    Keyboard.dismiss()

    this.refs.CONTAINER.fadeBackground(200)
    this.refs.CARD.fadeOutDown(200)//.then(()=>this.refs.CONTAINER.fadeBackground(200))
    this.refs.TITLE.fadeOutDown(200)
    // this.refs.FRIENDS.fadeOutDown(200)
    this.refs.BUTTON.fadeOutDown(200).then(()=>{
      Actions.pop()
    })

  }

  _close = () => {
    this._closeLightbox()
    // this._saveSuccessAnimation()
  }


  onSwipe = (gestureName, gestureState) => {
    const {SWIPE_DOWN} = swipeDirections;
    switch (gestureName) {
      case SWIPE_DOWN:
        Actions.pop()
        break;
    }
  }

  _getTitleText = () => {
    const { walkthrough, category, unfinished, user} = this.props
    let titleText = 'what????'

    if(walkthrough && !unfinished.title)  titleText = `What ${category}?`;
    if(!walkthrough && !unfinished.title)  titleText = `What?`;
    if(unfinished.title) titleText = `Who told you?`;
    if(unfinished.from == user.uid) titleText = `What are you recommending?`;

    return titleText
  }


  render() {

    // console.log('render newRec STATE',this.state)
    // console.log('render newRec PROPS',this.props)

    const { updateState, renderButton, placeholderText, onFriendPress, friends, unfinished, setTitle, walkthrough, category, inputHeight } = this.props;

    return (

      <Animatable.View ref="CONTAINER" style={styles.container} {...animationConfig.CONTAINER} >
        <StatusBar hidden={true} animated={true} />


        <Animatable.View ref="CLOSE" {...animationConfig.CLOSE} >
          <Icon onPress={this._close} name="x" size={25} style={styles.closeButton} />
        </Animatable.View>

        <Animatable.View ref="TITLE" {...animationConfig.TITLE} >
          <Text style={styles.title}>{this._getTitleText()}</Text>
        </Animatable.View>


<View style={{flex: 1}}>

        <View style={styles.topContainer}>
          <Animatable.View ref="CARD" {...animationConfig.CARD}  style={[styles.CARD,{height: CARD_HEIGHT }]} easing="ease-out-cubic">
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
        <Animatable.View ref="FRIENDS" keyboardShouldPersistTaps="always" style={styles.friendsContainer}>

          { _.map(friends, (friend,i) => {
            // console.log(friend)
            return (
              <TouchableOpacity key={i} onPress={() => this._setFriend(friend)} style={styles.friendTouchable}>
                <Text style={[styles.friendText,{color: friend.uid ? colors.pink : 'white'}]}>{friend.name}{friend.uid&&'!'}</Text>
              </TouchableOpacity>
            );
          })}
        </Animatable.View>
      }

</View>
        <Animatable.View ref="BUTTON">
          {!unfinished.title && this.props.title !== '' && !unfinished.from && <Button text="Next" onPress={this.props.onNextPress} />}
          {unfinished.title && this.props.friendName !== '' && <Button text="Save" onPress={this._onSavePress} /> }
          {!unfinished.title && this.props.title !== '' && unfinished.from &&  <Button text={`Send to ${unfinished.to_name}`} onPress={this._sendRec} /> }
        </Animatable.View>

        <KeyboardSpacer />

      </Animatable.View>

    )
  }
}

export default InputTitle;


// _throwParty = () => {
//   // console.log(this.refs.CARD)
//   this.refs.CARD.throwParty(500).then(()=> {
//     this.refs.CONTAINER.fadeOut(200).then(()=>{
//       this.props.setFriend() // this is bad to have here cause we are assuming everything saved properly before we know it did
//       // Actions.pop()
//     })
//   })
//
// }
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
