import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { Actions} from 'react-native-router-flux';

import { colors, text } from '../config/styles';
import { CategoryIcon, CategoryPicker, Category,CategoryPickerEditing } from './Category';
import * as Friend from './Friend';
// import * as Rec from './Generic/Rec'
import { Divider, Button } from './Generic'
import { Reminder } from './Reminder'



// ---------------------------------------
// Title
// ---------------------------------------

export const Title = ({rec, small, large}) => {

  // const fontSize = small ? 14 : large && 50
  const textStyles =
    {
      ...text,
      // fontSize,
    }

  return (
    <Text style={textStyles}>{rec.title}</Text>
  )
}



// ---------------------------------------
// Abstract to a super generic card
// ---------------------------------------

class GenericCard extends Component {

render() {
  // console.log(this.props)
  const { rec } = this.props;
  return (
    <View style={cardStyles.container}>
      <View style={cardStyles.headerContainer}>
        <View style={cardStyles.friendContainer}>
          <Friend.Name friend={rec.friend} />
        </View>
        <View style={cardStyles.iconContainer}>
          {rec.reminder && <Icon name="clock" size={17} color={"grey"} style={{paddingRight:5}}/>}
          {rec.category && <CategoryIcon rec={rec} size={17} color={"yellow"}/>}
        </View>
      </View>
      <View style={cardStyles.bodyContainer}>
          <Title rec={rec} />
        </View>
    </View>
    )
  }
}

class SkinnyCard extends Component {

render() {
  // console.log(this.props)
  const { rec } = this.props;
  return (
    <View style={cardStyles.container}>
      <View style={cardStyles.headerContainer}>
        <View style={cardStyles.friendContainer}>
          <Friend.Name friend={rec.friend} small />
        </View>
        <View style={cardStyles.iconContainer}>
          {rec.category && <CategoryIcon rec={rec} size={17} color={"yellow"}/>}
        </View>
      </View>
      <View style={cardStyles.bodyContainer}>
          <Title rec={rec} small />
        </View>
    </View>
    )
  }
}

const cardStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 10,
    padding: 15,
    margin: 5,
    backgroundColor: 'white',
    flex: 1,
  },
  headerContainer: {
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    height: 25,
    justifyContent: 'center', // v
    marginBottom: 5,
  },
  friendContainer: {
    // backgroundColor: 'yellow',
    flex: 6,
  },
  iconContainer: {
    // backgroundColor: 'yellow',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start', //
    justifyContent: 'flex-end',
  },
  bodyContainer: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'flex-start', // v
  },

  // inputTitle: {
  //   ...text,
  //   flex:1,
  // },
  // inputFriend: {
  //   ...text,
  //   fontSize: 20,
  //   color: colors.pink,
  //   borderBottomWidth: 1,
  //   borderBottomColor: colors.borderColor,
  // },
  //
  // recText: {
  //   ...text,
  //   fontSize: 19,
  //   fontWeight: '400',
  //   color: colors.black,
  // },
  //
  // friendText: {
  //   fontSize: 10,
  //   color: colors.darkGrey,
  //   lineHeight: 17,
  //   fontWeight: '100'
  //   // backgroundColor:'blue',
  //
  // },
  //
  // bold: {
  //   fontWeight: '700',
  //   // color: colors.darkGrey
  // },
  //
  //
  // // searching for user
  // inputContainer: {
  //   // flex: 1,
  //   // width: TEXT_WIDTH,// might need to change this
  // },
  // input: {
  //   ...text,
  //   fontSize: 20,
  //   paddingLeft: 0,
  //   paddingTop: 5,
  //   height: 50,
  //   // borderColor: colors.lightGrey,
  //   borderBottomWidth: 0,
  //   // backgroundColor: 'yellow',
  // },
  //
  // label: {
  //   ...text,
  //   color: colors.darkGrey,
  //   fontSize: 14,
  //   fontWeight: '400',
  //   lineHeight:20,
  //   // marginTop:25,
  //   marginLeft: 12,
  //   paddingRight: 10,
  // },
  //
  // backgroundShadow: {
  //   borderColor: '#aaa',
  //   shadowColor: '#555',
  //   shadowOffset: {
  //     width: 0,
  //     height: 3
  //   },
  //   shadowRadius: 15,
  //   shadowOpacity: 1.0
  // },
  //
  // translucentBackground: {
  //   backgroundColor: 'rgba(255,255,255,0.9)',
  //
  //   borderColor: 'purple',
  //   shadowColor: '#aaa',
  //   shadowOffset: {
  //     width: 3,
  //     height: 3
  //   },
  //   shadowRadius: 5,
  //   shadowOpacity: 0.7,
  // }


});

// ---------------------------------------
// Use abstracted card
// ---------------------------------------

export class Card extends Component {

  _onCardPress = () => {
    Actions.push('RecView',{rec: this.props.rec})
  }

  render() {
    // console.log(this.props)
    const { rec, listItem, skinny } = this.props;

    if(listItem) { // Dashboard
      return (
        <TouchableOpacity onPress={this._onCardPress} activeOpacity={0.9}>
          <GenericCard rec={rec} />
        </TouchableOpacity>
      )
    } else if(skinny) {  // FriendView
      return (
          <SkinnyCard rec={rec} />
      )
    } else {
      return null
    }

  }
}
//
// // ---------------------------------------
// //  Card detail aka RecView also edits
// // ---------------------------------------
//

//
export class CardDetail extends Component {

render() {
  // console.log(this.props)
  const { rec, updateRec, updateState, isEditing } = this.props;
  return (
    <View style={{flex: 1}}>
        <View style={[cardStyles.container]}>

          <View style={cardStyles.headerContainer}>
            <View style={cardStyles.friendContainer}>
              <Friend.Name friend={rec.friend} onPress={() => Actions.push('FriendView',{friend: rec.friend})} />
            </View>

          </View>
          <View style={cardStyles.bodyContainer}>
          {
            isEditing ?
              <InputRecTitle title={rec.title} updateRec={updateRec} updateState={updateState} /> :
              <Title rec={rec} />
          }

          </View>
          <Divider />

          {
            rec.category && !isEditing &&
              <Category rec={rec} />
          }

          {
            rec.category && isEditing &&
              <CategoryPickerEditing category={rec.category} updateRec={updateRec} />
          }

          {
            !rec.category &&
              <CategoryPickerEditing rec={rec} updateRec={updateRec} saveImmediately />
          }

          {rec.reminder &&
<Reminder rec={rec} />
        }



        </View>

        </View>



  );

}


};
//

// ---------------------------------------
// Input Form for Rec Title
// ---------------------------------------


export class InputRecTitle extends Component {

render() {
  // console.log(this.props)
  const { updateRec, updateState, title } = this.props;
  return (

          <TextInput
            placeholder='Type here...'
            ref={ c => this._titleInput = c }
            autoCapitalize="none"
            value={title}
            autoCorrect={false}
            autoFocus={false}
            placeholderTextColor="#bbb"
            multiline={true}
            style={inputStyles.inputTitle}
            onChangeText={(title) => updateRec({title})}
            onLayout={(event) => {
              var {x, y, width, height} = event.nativeEvent.layout;
              // console.log('input height',height)
              updateState({inputHeight: height})
            }}
          />
  );
}


};



const inputStyles = StyleSheet.create({
  inputTitle: {
    ...text,
    flex:1,
  },
})
