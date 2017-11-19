import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import { Actions} from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import { colors, text } from '../config/styles';
import { CategoryEmoji, CategoryPicker, Category,CategoryPickerEditing, EmptyCategory } from './Category';
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
  const { rec, totalRecs } = this.props;
  let extraStyles = {
    accepted: {
      borderColor: colors.grey,
      borderWidth: 2,
    }
  }

  // resize based on content
  const titleFontSize   = totalRecs > 10 ? 16 : 30
  const friendFontSize  = totalRecs > 10 ? 14 : 18
  const headerHeight    = totalRecs > 10 ? 20 : 25
  const paddingV        = totalRecs > 10 ? 10 : 15

  return (
    <View style={[cardStyles.container,rec.status == 'accepted' && extraStyles.accepted,{paddingVertical: paddingV}]}>
      <View style={[cardStyles.headerContainer,{height: headerHeight}]}>
        <View style={cardStyles.friendContainer}>
          <Friend.Name friend={rec.friend} fontSize={friendFontSize} />
        </View>
        <View style={cardStyles.iconContainer}>
          {moment().diff(rec.createdAt) < 200000 && <Animatable.View animation="fadeOut" delay={2000}><Icon name="square" size={17} color={"green"} style={{paddingRight:5}}/></Animatable.View>}
          {rec.friend.invitedAt && !rec.friend.uid && <Icon name="navigation" size={17} color={colors.pink} style={{paddingRight:5, opacity: 0.5}}/>}
          { moment().diff(rec.reminder) < 0 && rec.reminder && <Icon name="clock" size={17} color={"grey"} style={{paddingRight:5, opacity: 0.5}}/>}
          { moment().diff(rec.reminder) > 0 && rec.reminder && <Icon name="alert-triangle" size={17} color={"red"} style={{paddingRight:5, opacity: 0.5}}/>}
          {rec.category ? <CategoryEmoji category={rec.category} size={17} /> : <EmptyCategory size={12} delay={2000} iterationCount='infinite' animation="jello" />}
          {rec.type == 'invite' && <Icon size={17} color={colors.purple} name="navigation"/>}

        </View>
      </View>
      <View style={cardStyles.bodyContainer}>
          <Title rec={rec} styles={{fontSize:titleFontSize}} />
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
          <CategoryEmoji category={rec.category} size={25} />
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
          <Text style={cardStyles.headerText}>{rec.status} invitation to: {rec.to.name}</Text>
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

class SentCard extends Component {

render() {
  // console.log(this.props)
  const { rec } = this.props;
  return (
    <View style={cardStyles.container}>
      <View style={cardStyles.headerContainer}>
        <View style={cardStyles.friendContainer}>
          <Text style={cardStyles.headerText}>You sent this recommendation to {rec.to.name || rec.to.displayName}</Text>
        </View>
      </View>
      <View style={[cardStyles.bodyContainer,{alignItems: 'center'}]}>
        <Icon size={25} color={rec.status == 'accepted' ? 'green' : 'pink'} name={rec.status == 'accepted' ? 'check' : rec.type == 'invite' ? 'navigation' : 'file'} />
        <Title rec={rec} styles={{fontSize: 20, marginLeft: 10}} />
        </View>
    </View>
    )
  }
}

class OpenCard extends Component {

  render() {
    // console.log(this.props)
    const { rec, acceptOpenRec } = this.props;
    return (
      <View style={cardStyles.container}>
        <View style={cardStyles.headerContainer}>
          <View style={cardStyles.friendContainer}>
            <Text style={cardStyles.headerText}>{rec.from.name || rec.from.displayName } sent you</Text>
          </View>
        </View>
        <View style={[cardStyles.bodyContainer,{alignItems: 'center'}]}>
          <CategoryEmoji category={rec.category} size={25} />
          <Title rec={rec} styles={{fontSize: 20, marginLeft: 10}} />
          </View>
          <View style={{width: 100, margin: 10}}>
            <Button rounded text="Accept" bgcolor="orange" onPress={acceptOpenRec}/>
            </View>
      </View>
      )
    }
}



export class CardGodView extends Component {

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
        <View style={[cardStyles.friendContainer,{flex: 3}]}>
          <Text style={cardStyles.dateText}>{moment(rec.createdAt).fromNow()}&nbsp;
          <Friend.Name friend={rec.from} fontSize={12} />
           &nbsp;&nbsp;&nbsp;&nbsp;---->
          </Text>
        </View>
        <View style={cardStyles.iconContainer}>
          <Friend.Name friend={rec.to} fontSize={12} />
        </View>
      </View>
      <View style={cardStyles.bodyContainer}>
          <Title rec={rec} />
        </View>
    </View>
    )
  }
}


class InboxCard extends Component {

render() {
  // console.log('card props',this.props)
  const { rec, acceptOpenRec } = this.props;
  let extraStyles = {
    accepted: {
      borderColor: colors.grey,
      borderWidth: 2,
    }
  }
  return (
    <View style={{marginBottom: 30}}>
    <View style={[cardStyles.container,rec.status == 'accepted' && extraStyles.accepted]}>
      <View style={cardStyles.headerContainer}>
        <View style={cardStyles.friendContainer}>
          <Text style={{fontSize: 13, fontWeight: '200', color: colors.grey}}>
          <Friend.Name friend={rec.friend} />
          &nbsp;&nbsp;Recommended
          </Text>
        </View>
        <View style={cardStyles.iconContainer} >
        {rec.status == 'accepted' && <Icon name="check" size={20} color="green" />}
        </View>
      </View>
      <View style={cardStyles.bodyContainer}>
        <View style={{width: 50}}>
          <CategoryEmoji category={rec.category} size={30} />
        </View>
        <View style={{}}>
          <Title rec={rec} styles={{fontSize: 22, maxWidth: 260}}/>
        </View>



      </View>

    </View>

    {rec.status == "open" &&
    <View style={cardStyles.optionsContainer}>
    <Button rounded bgcolor="green" text="Accept" onPress={()=>acceptOpenRec(rec)} />
    <Button rounded bgcolor="orange" text="I seen't it" onPress={()=>Alert.alert('Coming Soon',' This feature is not yet implemented')}/>
    </View>
  }


    </View>
    )
  }
}

// ---------------------------------------
//  FINAL STEP OF ONBOARDING
// ---------------------------------------

export class ConfirmationCard extends Component {

render() {
  // console.log('card props',this.props)
  const { rec } = this.props;


  return (
    <View style={[cardStyles.container,{flex: 0}]}>
      <View style={cardStyles.headerContainer}>
        <View style={cardStyles.friendContainer}>
          <Friend.Name friend={rec.from} />
        </View>
        <View style={cardStyles.iconContainer}>
          {moment().diff(rec.createdAt) < 200000 && <Animatable.View animation="fadeOut" delay={2000}><Icon name="square" size={17} color={"green"} style={{paddingRight:5}}/></Animatable.View>}

          {moment().diff(rec.reminder) < 0 && rec.reminder && <Icon name="clock" size={17} color={"grey"} style={{paddingRight:5, opacity: 0.5}}/>}
          {rec.category && <CategoryEmoji category={rec.category} size={17} />}
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


const cardStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.borderColor,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 5,
    backgroundColor: 'white',
    flex: 4,
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
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'flex-start',
    flex: 1,
    // backgroundColor: 'red'
  },
  categoryPickerContainer: {

    flexDirection: 'row',
    // paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'flex-start',
    flex: 3,
    // backgroundColor: 'orange'
  },
  optionIcon: {
    padding: 5,
    margin: 5,
    fontSize: 17,
    // backgroundColor: 'yellow',
  },
  dateText: {
    ...text,
    fontSize: 10,
    color: colors.darkGrey,
    fontWeight: '300',
    // marginTop: 20,
    // marginLeft: 10,

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
    const { rec, user, listItem, skinny, given, invitation, open, sent, inbox} = this.props;

    if(listItem) { // Dashboard
      return (
        <TouchableOpacity onPress={this._onCardPress} activeOpacity={0.9}>
          <GenericCard rec={rec} totalRecs={this.props.totalRecs}/>
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
    } else if(open) {  // Inbox
      return (
        <TouchableOpacity onPress={this._onCardPress} activeOpacity={0.9}>
          <OpenCard rec={rec} user={user} acceptOpenRec={()=>this.props.acceptOpenRec(rec)} />
        </TouchableOpacity>
      )
    } else if(sent) {  // Invites
      return (
        <TouchableOpacity onPress={this._onCardPress} activeOpacity={0.9}>
          <SentCard rec={rec} user={user} />
        </TouchableOpacity>
      )

    } else if(inbox) {  // Invites
      // console.warn('asfd')
      return (
        <TouchableOpacity onPress={this._onCardPress} activeOpacity={0.9}>
          <InboxCard rec={rec} user={user} acceptOpenRec={this.props.acceptOpenRec} />
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
  const { user, rec, acceptInvitation, updateRec, updateState, isEditing, onDelete, app, setRecReminder } = props

  const given = user.uid == rec.from.uid

  return (
    <View style={{flex: 1}}>
      <View style={[cardStyles.container]}>

          <View style={cardStyles.headerContainer}>
            <View style={cardStyles.friendContainer}>
              <Text style={cardStyles.headerText}>
                {given ? `You invited ${rec.to.name || rec.to.displayName}` : `${rec.from.name || rec.from.displayName} invited you`}
              </Text>
            </View>

          </View>

          <View style={cardStyles.bodyContainer}>
            <Icon name="navigation" size={30} color={colors.purple} style={{marginRight: 10,marginTop: 5,}}/>
            <Title rec={rec} />
          </View>



        </View>


        {
          user && rec.to.phoneNumber == user.phoneNumber && rec.status == 'open' &&
            <View>
              <Button rounded fat bgcolor="pink" onPress={acceptInvitation} text="Accept Invitation" />
            </View>
        }

        {
          user && rec.to.phoneNumber == user.phoneNumber && rec.status == 'accepted' &&
            <View>
              <Button rounded fat bgcolor="green" onPress={() => Actions.replace('Dashboard')} text="Go to Dashboard" />
            </View>
        }

        </View>



  );

}

// <Label>CreatedAt: {moment(rec.createdAt).fromNow()}</Label>
// <Label>InvitedAt: {moment(rec.invitedAt).fromNow()}</Label>
// <Label>Sent to: {rec.to.phoneNumber} </Label>


//
export class CardDetail extends Component {

render() {

  // console.log(this.props)
  // i guess this can get called w new rec
  if(!this.props.rec) { return null}

  // tmp maybe
  if(this.props.rec.type == 'invite') {return <InvitationDetail {...this.props} /> }

  const { rec, updateRec, updateState, isEditing, onDelete, app, setRecReminder } = this.props;
  return (
    <View style={{flex: 1,}}>

        <View style={[cardStyles.container, {marginHorizontal: 20}]}>

          <View style={cardStyles.headerContainer}>
            <View style={cardStyles.friendContainer}>
              <Friend.Name fontSize={24} friend={rec.friend} onPress={() => Actions.push('FriendView',{friend: rec.friend})} />
            </View>

          </View>
          <View style={cardStyles.bodyContainer}>
          {
            isEditing ?
              <InputRecTitle rec={rec} updateState={updateState} /> :
              <Title rec={rec} />
          }

          </View>

          <Divider />
          <View style={{flex: 1,alignItems: 'flex-end', flexDirection: 'row'}}>

          {
            rec.category && !isEditing ?
              <Category category={rec.category} />
              :
              <EmptyCategory size={30} delay={2000} iterationCount={1} animation="rubberBand" />
          }


          {rec.reminder &&
            <Reminder rec={rec} />
        }
</View>


        </View>

        {!isEditing &&
        <View style={cardStyles.optionsContainer} >
          <Icon name="trash" color="white" style={cardStyles.optionIcon} onPress={onDelete} />
          <Icon name="edit" color="white" style={cardStyles.optionIcon} onPress={()=>updateState({isEditing: true})} />
          {!rec.reminder && <SetReminderIcon rec={rec} updateRec={updateRec} app={app} setRecReminder={setRecReminder} />}
          {rec.reminder && moment().diff(rec.reminder) > 0 && <SetReminderIcon rec={rec} color="red" updateRec={updateRec} app={app} setRecReminder={setRecReminder} />}

        </View> }

        <View style={cardStyles.categoryPickerContainer}>
        {
          rec.category != null && isEditing &&
            <CategoryPickerEditing rec={rec} updateRec={updateRec} saveImmediately />
        }


        {
          !rec.category &&
            <View>
              <Text style={{...text, color: 'white', fontSize:22, marginLeft: 20}}>Pick a category</Text>
              <CategoryPickerEditing rec={rec} updateRec={updateRec} saveImmediately />
            </View>
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
  const { updateState, rec } = this.props;
  return (

          <TextInput
            placeholder='Type here...'
            ref={ c => this._titleInput = c }
            autoCapitalize="none"
            value={rec.title}
            autoCorrect={false}
            autoFocus={false}
            placeholderTextColor="#bbb"
            multiline={true}
            style={inputStyles.inputTitle}
            onChangeText={(title) => updateState({rec: {...rec,title}} ) }

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
