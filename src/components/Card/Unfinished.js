import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { Actions} from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { colors } from '../../config/styles';
import styles from './styles';
import { CategoryIcon } from '../../components/Category';
import { Button } from '../../components/Generic';
import * as Rec from '../../components/Generic/Rec'
import * as Friend from '../../components/Friend';

MyCustomComponent = Animatable.createAnimatableComponent(TextInput);

class Unfinished extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',

      // updateState: (state) => this.setState({state}),
    }
  }

  componentDidMount() {
    // if(Actions.currentScene == 'InputTitle')
      // this._titleInput.focus()
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.unfinished.title != this.props.unfinished.title) {
      // do not dismiss the keyboard
      // this._titleFriend.focus()
    }
  }

  onSave = () => {
    // this.refs.Card.transitionTo({height:150})
    // this.setState({title: 'dude'})
  }

render() {
  // console.log(this.props)
  const { rec, updateState, title, unfinished, friendName, setTitle,placeholderText } = this.props;
  return (

        <Animatable.View ref="Card" style={[styles.container,{margin:15,flex:1}]} animation="fadeInUp" duration={500} delay={50}>

        {unfinished.title &&
        <Animatable.View style={styles.headerContainer} animation={{from:{height:0},to:{height:25}}}>


          <View style={styles.friendContainer}>
          {unfinished.title && !unfinished.friend &&
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

            {unfinished.friend && <Friend.Name friend={unfinished.friend} /> }
          </View>


          <View style={styles.iconContainer}>

          </View>
        </Animatable.View>}


        <View style={[styles.bodyContainer,{flex: 1}]}>
        {!unfinished.title ?
          <TextInput
            placeholder='Type here...'
            ref={ c => this._titleInput = c }
            autoCapitalize="none"
            value={title}
            autoCorrect={false}
            autoFocus={true}
            placeholderTextColor="#bbb"
            multiline={true}
            style={styles.inputTitle}

            onChangeText={(title) => updateState({title})}
            onLayout={(event) => {
              var {x, y, width, height} = event.nativeEvent.layout;
              // console.log('input height',height)
              updateState({inputHeight: height})
            }}
          /> :

          <Rec.Title rec={unfinished} />
        }
          </View>

        <View>

      </View>

      </Animatable.View>



  );
}


};

export default Unfinished;






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
