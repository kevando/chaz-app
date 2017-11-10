import React from 'react';
import { View, Text, ScrollView, StatusBar, TextInput } from 'react-native';
import _ from 'lodash'
import { Actions } from 'react-native-router-flux'
import styles from './styles';
import { UserCard, FindUserCard, RecCard } from '../../components/Card/FriendView'
import { Card } from '../../components/Rec'
import * as Friend from '../../components/Friend'
import { Label, Button } from '../../components/Generic/';
import Icon from 'react-native-vector-icons/Feather'
import { colors, text } from '../../config/styles';

const FriendView = ({ friend, app, friendRecs, user, onGiveRecPress, friends, combineFriend }) => {

// var filterFriends = _.filter(friends, friend =>  friend.name)

  return (
    <View style={styles.container}>
      <Friend.Header friend={friend} />
      <ScrollView style={styles.scrollContainer}>



      {
        _.map(friendRecs,(rec,i) => {return (
          <Card skinny key={i} rec={rec} given={rec.from.uid == user.uid} />
        )})
      }


        {!friend.uid && friend.invitedAt &&
          <View style={{marginHorizontal: 20}}>
          <Label center>Any minute...</Label>

          </View>
        }

        {friend.displayName && // pending friendship
          <View style={{marginHorizontal: 20}}>
          <Label center title>{friend.displayName} connected with you</Label>
          <Label center>Merge with existing friend?</Label>

          {

            _.map(friends,(f,i) => {
              if(f.id != friend.id) {
                return (
                  <View style={styles.friendRowItem} key={i}>
                    <Text onPress={()=>combineFriend(f)} style={styles.friendText} >{f.name || f.displayName+ ' (Pending)'}</Text>
                  </View>
                )
              }
            })
          }


          <Text onPress={()=>combineFriend()}>No, just add this friend</Text>
          </View>
        }



      </ScrollView>
      { friend.uid && friend.friendshipStatus != 'pending' && <Button text="Send a Recommendation" onPress={onGiveRecPress} /> }
      { !friend.uid && !app.isAnon && !friend.invitedAt &&<Button bgcolor="pink" text={`Recommend chaz to ${friend.name}`} onPress={()=>Actions.push('InviteModal',{friend})} /> }
      { !friend.uid && !app.isAnon && friend.invitedAt && <Button bgcolor="pink" text="Invited" onPress={()=>Actions.push('InviteModal',{friend})} /> }
    </View>
  );
}

export default FriendView;
