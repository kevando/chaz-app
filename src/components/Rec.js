import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { Actions} from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import { colors, text } from '../config/styles';
import { CategoryIcon, CategoryPicker, Category,CategoryPickerEditing } from './Category';
import * as Friend from './Friend';
import {Label} from './Generic'
import { Divider, Button } from './Generic'
import { Reminder } from './Reminder'
import { SetReminderIcon  } from './SetReminder'



// ---------------------------------------
// Title
// ---------------------------------------

export const Title = ({rec, styles}) => {

  // const fontSize = small ? 14 : large && 50
  const textStyles =
    {
      ...text,
      ...styles,
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
  // console.log('card props',this.props)
  const { rec } = this.props;
  let extraStyles = {
    accepted: {
      borderColor: colors.grey,
      borderWidth: 2,
    }
  }
  return (
    <View style={[cardStyles.container,rec.status == 'accepted' && extraStyles.accepted]}>
      <View style={cardStyles.headerContainer}>
        <View style={cardStyles.friendContainer}>
          <Friend.Name friend={rec.friend} />
        </View>
        <View style={cardStyles.iconContainer}>
          {moment().diff(rec.createdAt) < 200000 && <Animatable.View animation="fadeOut" delay={2000}><Icon name="square" size={17} color={"green"} style={{paddingRight:5}}/></Animatable.View>}
          {rec.friend.invitedAt && !rec.friend.uid && <Icon name="mail" size={17} color={colors.pink} style={{paddingRight:5, opacity: 0.5}}/>}
          {moment().diff(rec.reminder) < 0 && rec.reminder && <Icon name="clock" size={17} color={"grey"} style={{paddingRight:5, opacity: 0.5}}/>}
          {rec.category && <CategoryIcon rec={rec} size={17} color={"yellow"}/>}
          {rec.type == 'invite' && <Icon size={17} color={colors.purple} name="navigation"/>}

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
  const { rec, given } = this.props;
  return (
    <View>
    <Text style={cardStyles.dateText}>{moment(rec.createdAt).fromNow()}</Text>
    <View style={[cardStyles.container,{backgroundColor: rec.status == 'open' ? 'rgba(255,255,255,0.5)' : 'white' } ]} >
      <View style={cardStyles.headerContainer}>
        <View style={cardStyles.friendContainer}>
          <Text style={cardStyles.headerText}>
            {rec.type == 'invite'  && rec.status == 'accepted' && '... invited you'}
            {given && 'You sent'}
            {!given  && 'You saved'}

          </Text>
        </View>
      </View>
      <View style={[cardStyles.bodyContainer,{alignItems: 'center'}]}>
        {
          rec.type == 'invite' ?
          <Icon size={25} color={"purple"} name="navigation"/> :
          <CategoryIcon rec={rec} size={25} color={"yellow"}/>
        }

        <Title rec={rec} styles={{fontSize: 20, marginLeft: 10}} />

        </View>
    </View>
    </View>
    )
  }
}

class InvitationCard extends Component {

render() {
  // console.log(this.props)
  const { rec } = this.props;
  return (
    <View style={cardStyles.container}>
      <View style={cardStyles.headerContainer}>
        <View style={cardStyles.friendContainer}>
          <Text style={cardStyles.dateText}>Invitation to: {rec.to.name}</Text>
          <Text style={cardStyles.dateText}>Status: {rec.status}</Text>
        </View>
      </View>
      <View style={[cardStyles.bodyContainer,{alignItems: 'center'}]}>
        <Icon size={25} color={"purple"} name="navigation" />
        <Title rec={rec} styles={{fontSize: 20, marginLeft: 10}} />
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
    flex: 4,
  },
  iconContainer: {
    // borderColor: 'black',
    // borderWidth: 1,
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

  optionsContainer: {
    // borderColor: 'white',
    // borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  optionIcon: {
    padding: 5,
    margin: 5,
    fontSize: 17,
    // backgroundColor: 'yellow',
  },
  dateText: {
    ...text,
    fontSize: 12,
    color: colors.white,
    fontWeight: '300',
    marginTop: 20,
    marginLeft: 10,

  },
  headerText: {
    ...text,
    fontSize: 12,
    color: colors.darkGrey,
    fontWeight: '300',
    // marginTop: 20,
    // marginLeft: 10,
}

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
    const { rec, user, listItem, skinny, given, invitation } = this.props;

    if(listItem) { // Dashboard
      return (
        <TouchableOpacity onPress={this._onCardPress} activeOpacity={0.9}>
          <GenericCard rec={rec} />
        </TouchableOpacity>
      )
    } else if(skinny) {  // FriendView
      return (
        <TouchableOpacity onPress={this._onCardPress} activeOpacity={0.9}>
          <SkinnyCard given={given} rec={rec} />
        </TouchableOpacity>
      )
    } else if(invitation) {  // FriendView
      return (
        <TouchableOpacity onPress={this._onCardPress} activeOpacity={0.9}>
          <InvitationCard rec={rec} user={user} />
        </TouchableOpacity>
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
const InvitationDetail = (props) => {


  if(!props.rec) { return null}
  const { user, rec, acceptInvitation, updateRec, updateState, isEditing, onDelete, updateRecommendation, app, setRecReminder } = props

  return (
    <View style={{flex: 1}}>
      <View style={[cardStyles.container]}>

          <View style={cardStyles.headerContainer}>
            <View style={cardStyles.friendContainer}>
              <Text style={cardStyles.dateText}>
                {rec.from.name} {rec.from.displayName}
                <Icon name="navigation" size={25} color="purple"/>
                {rec.to.name} {rec.to.displayName}
              </Text>
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
              <View>
                <Text>What is this?</Text>
                <CategoryPickerEditing rec={rec} updateRec={updateRec} saveImmediately />
              </View>
          }



          {rec.reminder &&
            <Reminder rec={rec} />
        }



        </View>
        <Label>CreatedAt: {moment(rec.createdAt).fromNow()}</Label>
        <Label>InvitedAt: {moment(rec.invitedAt).fromNow()}</Label>
        <Label>Sent to: {rec.to.phoneNumber}</Label>

        {
          rec.to.phoneNumber == user.phoneNumber && rec.status == 'open' &&
            <View>
              <Label>This is YOUR invitation to chaz</Label>
              <Text onPress={acceptInvitation}>ACCEPT</Text>
            </View>
        }

        </View>



  );

}


//
export class CardDetail extends Component {

render() {

  // console.log(this.props)
  // i guess this can get called w new rec
  if(!this.props.rec) { return null}

  // tmp maybe
  if(this.props.rec.type == 'invite') {return <InvitationDetail {...this.props} /> }

  const { rec, updateRec, updateState, isEditing, onDelete, updateRecommendation, app, setRecReminder } = this.props;
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
              <View>
                <Text>What is this?</Text>
                <CategoryPickerEditing rec={rec} updateRec={updateRec} saveImmediately />
              </View>
          }



          {rec.reminder &&
            <Reminder rec={rec} />
        }



        </View>
        {!isEditing &&
        <View style={cardStyles.optionsContainer} >
          <Icon name="trash" color="white" style={cardStyles.optionIcon} onPress={onDelete} />
          <Icon name="edit" color="white" style={cardStyles.optionIcon} onPress={()=>updateState({isEditing: true})} />
          <SetReminderIcon rec={rec} updateRecommendation={updateRecommendation} app={app} setRecReminder={setRecReminder} />
        </View> }

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
