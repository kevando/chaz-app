import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { Actions} from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { colors } from '../../config/styles';
import styles from './styles';

import { Button } from '../../components/Generic';
import * as Rec from '../../components/Rec'
import * as Friend from '../../components/Friend';

MyCustomComponent = Animatable.createAnimatableComponent(TextInput);

Animatable.initializeRegistryWithDefinitions({
  collapseCard: {
    from: {minHeight: 200},
    to: {minHeight: 0},
  },


});

class Unfinished extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: this.props.unfinished.title || '',

      rec: this.props.unfinished,
    }
  }

  // componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if(nextProps.unfinished.title != this.props.unfinished.title) {
      // User saved the rec title!!!
      // lets animate the card for the friend input
      this._transitionToFriendInput()
    }
  }
  _transitionToFriendInput = () => {
    this.refs.CONTAINER.collapseCard(500)
  }

  onSave = () => {
    // this.refs.Card.transitionTo({height:150})
    // this.setState({title: 'dude'})
  }
  // <Animatable.View ref="Card" style={[styles.container,{margin:15,flex:1}]} animation="fadeInUp" duration={500} delay={50}>
  //
  // {unfinished.title &&
  // <Animatable.View style={styles.headerContainer} animation={{from:{height:0},to:{height:25}}}>

render() {
  // console.log('UN',this.props)

  const { rec, updateState, title, unfinished, friendName, setTitle,placeholderText } = this.props;
  // console.warn(unfinished.to.name)
  return (

        <Animatable.View ref="CONTAINER" style={[styles.container,{minHeight: unfinished.title ? 0: 200, margin:15}]} >

        {unfinished.to && unfinished.to.name && <Text>To: <Friend.Name friend={{name:unfinished.to.name}} /></Text> }

        {unfinished.title && !unfinished.to.name &&
        <Animatable.View style={styles.headerContainer} animation={{from:{height:0},to:{height:25}}} duration={500} delay={200} >


          <View style={styles.friendContainer}>

          {unfinished.title && !unfinished.to.name && unfinished.walkthrough &&
            <TextInput
              placeholder='friend name'
              ref={ c => this._titleFriend = c }
              autoCapitalize="none"
              value={(unfinished.walkthrough && unfinished.from.displayName) ? unfinished.from.displayName : friendName}
              autoCorrect={false}
              placeholderTextColor="#aaa"
              multiline={false}
              autoFocus={unfinished.walkthrough}
              editable={this.props.hideKeyboard != 'yes now'}
              style={styles.inputFriend}
              onChangeText={(friendName) => updateState({friendName})}
            /> }

            {unfinished.title && !unfinished.to.name && !unfinished.walkthrough &&
              <TextInput
                placeholder='friend name'
                ref={ c => this._titleFriend = c }
                autoCapitalize="none"
                value={friendName}
                autoCorrect={false}
                placeholderTextColor="#aaa"
                multiline={false}
                autoFocus={true}
                editable={this.props.hideKeyboard != 'yes now'}
                style={styles.inputFriend}
                onChangeText={(friendName) => updateState({friendName})}
              /> }


          </View>


          <View style={styles.iconContainer}>

          </View>
        </Animatable.View>}


        <View style={[styles.bodyContainer]}>

        {
          unfinished.walkthrough && // ONBOARDING
          <TextInput
            placeholder='Type here...'
            ref={ c => this._titleInput = c }
            autoCapitalize="none"
            value={unfinished.walkthrough ? unfinished.title : title}
            autoCorrect={false}
            autoFocus={!unfinished.walkthrough && !title}
            placeholderTextColor="#bbb"
            multiline={true}
            style={styles.inputTitle}
            autoGrow={true}
            maxHeight={200}
            isEditable={!unfinished.walkthrough && !title}

            onChangeText={(title) => updateState({title})}

          />
        }
        {
          !unfinished.walkthrough && // NORMAL
          <TextInput
            placeholder='Type here...'
            ref={ c => this._titleInput = c }
            autoCapitalize="none"
            value={unfinished.walkthrough ? unfinished.title : title}
            autoCorrect={false}
            autoFocus={true}
            placeholderTextColor="#bbb"
            multiline={true}
            style={styles.inputTitle}
            autoGrow={true}
            maxHeight={200}
            isEditable={true}

            onChangeText={(title) => updateState({title})}

          />
        }




          </View>

        <View>

      </View>

      </Animatable.View>




  );
}


};

export default Unfinished;

// <TextInput....
// onLayout={(event) => {
//   var {x, y, width, height} = event.nativeEvent.layout;
//   // console.log('input height',height)
//   updateState({inputHeight: height})
// }}



// ------------------

//
// export class InputRecTitle extends Component {
//
// render() {
//   // console.log(this.props)
//   const { updateRec, updateState, title } = this.props;
//   return (
//
//           <TextInput
//             placeholder='Type here...'
//             ref={ c => this._titleInput = c }
//             autoCapitalize="none"
//             value={title}
//             autoCorrect={false}
//             autoFocus={false}
//             placeholderTextColor="#bbb"
//             multiline={true}
//             style={styles.inputTitle}
//             onChangeText={(title) => updateRec({title})}
//             onLayout={(event) => {
//               var {x, y, width, height} = event.nativeEvent.layout;
//               // console.log('input height',height)
//               updateState({inputHeight: height})
//             }}
//           />
//   );
// }
//
//
// };
