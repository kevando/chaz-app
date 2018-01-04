import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import _ from 'lodash'
import { Actions } from 'react-native-router-flux'
import styles from './styles';
import { UserCard, FindUserCard, RecCard } from '../../components/Card/FriendView'
import { Card } from '../../components/Rec'
import * as Friend from '../../components/Friend'
import { Label, Button, Title, Container } from '../../components/Generic/';
import Icon from 'react-native-vector-icons/Feather'
import { colors, text } from '../../config/styles';

const FriendView = ({ onNamePress, friend, app, friendRecs, user, onGiveRecPress, friends, combineFriend }) => {

  let friendScore = 'NA'
  if(friend.gradeCount && friend.gradeTotal) {
    friendScore = '' + friend.gradeTotal + '/'  + friend.gradeCount
  }

  return (
    <View style={{flex: 1}}>
    <Container>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>

        <View style={styles.tableContainer}>
          <View style={[styles.row,{marginBottom: 20}]}>
            <View style={styles.colLeft}>
              <TouchableOpacity onPress={onNamePress}><Title header>{friend.name || friend.displayName}</Title></TouchableOpacity>
            </View>
            <View style={styles.colRight}>
              <Text style={[styles.friendEmoji]}>{friend.uid ? '🤠' : '😊'}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.colLeft}>
              <Text style={[styles.valueText]}>Recommendations</Text>
            </View>
            <View style={styles.colRight}>
              <Text style={[styles.valueText]}>{friendRecs.length}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.colLeft}>
              <Text style={[styles.valueText]}>Score</Text>
            </View>
            <View style={styles.colRight}>
              <Text style={[styles.valueText]}>{friendScore}</Text>
            </View>
          </View>

        </View>



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

        {friend.displayName && friend.friendshipStatus == 'pending' &&// pending friendship
          <View style={{marginHorizontal: 20}}>
          <Label center title>{friend.displayName} connected with you!</Label>
          <Label center>Merge with existing friend?</Label>

          {

            _.map(friends,(f,i) => {
              if(f.id != friend.id) {
                return (
                  <View style={[styles.friendRowItem,{backgroundColor: 'white', padding: 5, margin: 5}]} key={i}>
                    <Text onPress={()=>combineFriend(f)} style={styles.friendText} >{f.name || f.displayName+ ' (Pending)'}</Text>
                  </View>
                )
              }
            })
          }

          <View style={[styles.friendRowItem,{backgroundColor: '#ddd', padding: 5, margin: 5}]} key={i}>
          <Text onPress={()=>combineFriend()}>No, just add this friend</Text>
          </View>

          </View>
        }



      </ScrollView>

    </Container>
    { friend.uid && friend.friendshipStatus != 'pending' && <Button text="Send a Recommendation" onPress={onGiveRecPress} /> }
    { !friend.uid && !app.isAnon && !friend.invitedAt &&<Button bgcolor="pink" text={`Recommend chaz to ${friend.name}`} onPress={()=>Actions.push('InviteModal',{friend})} /> }
    { !friend.uid && !app.isAnon && friend.invitedAt && <Button bgcolor="pink" text="Invited" onPress={()=>Actions.push('InviteModal',{friend})} /> }
    </View>
  );
}

export default FriendView;
