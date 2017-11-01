import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { Actions} from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { colors } from '../../config/styles';
import styles from './styles';
import { CategoryIcon } from '../../components/Category/Icon';
import { Button } from '../../components/Generic';
import { Title } from '../../components/Generic/Rec'
import * as Friend from '../../components/Generic/Friend';

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

        <View style={styles.headerContainer}>


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
              style={styles.inputFriend}
              onChangeText={(friendName) => updateState({friendName})}
            /> }

            {unfinished.friend && <Friend.Name friend={unfinished.friend} /> }
          </View>


          <View style={styles.iconContainer}>

          </View>
        </View>
        <View style={[styles.bodyContainer,{flex: 1}]}>
        {!unfinished.title ?
          <TextInput
            placeholder='What?'
            ref={ c => this._titleInput = c }
            autoCapitalize="none"
            value={title}
            autoCorrect={false}
            autoFocus={true}
            placeholderTextColor="#aaa"
            multiline={true}
            style={styles.inputTitle}
            onChangeText={(title) => updateState({title})}
          /> :

          <Title rec={unfinished} />
        }
          </View>

        <View>

      </View>

      </Animatable.View>



  );
}


};

export default Unfinished;
