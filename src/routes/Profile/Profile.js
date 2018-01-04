import React from 'react';
import { View ,Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Feather'
import { Label } from '../../components/Generic';
import { colors, text } from '../../config/styles';
import { Actions } from 'react-native-router-flux';

import * as Animatable from 'react-native-animatable'

import styles from './styles';

const GivenRecs = ({givenRecs}) => {
  return (
    <View>
    <Label>Recommendations that I gave</Label>
    {
    _.map(givenRecs,rec => {
      return <Text key={rec.id}>{rec.title}</Text>
    })
  }
  </View>
  )
}

const Profile = (props) => {
  // console.log(props)
  const { user, friends, givenRecs, onlineFriends, formatedNumber, logout } = props;

  return (
    <ScrollView style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.title} onPress={logout}>{user.displayName}</Text>
        <Text style={styles.subTitle}>{formatedNumber}</Text>
      </View>

      { friends.length == 0 &&
        <View>
        <Label center>You are alone.</Label>
        <Animatable.View animation="fadeIn" delay={1000}>
          <Label center>Get your friends on chaz by clicking their name</Label>
        </Animatable.View>
        </View>
      }

      { friends.length == 1 &&
        <Label title>You have 1 friend.</Label>
      }

      { friends.length > 1 &&
        <Label title>You have {friends.length} friends.</Label>
      }

      {
        _.map(friends,(friend,i) => {
          return (
            <TouchableOpacity key={i} onPress={()=>Actions.push('FriendView',{friendId: friend.id})}>
            <View style={styles.friendRowItem} >

              <Text style={styles.friendText} >{friend.uid ? '🤠' : '😊'} {friend.name || friend.displayName+ ' (Pending)'}</Text>
            </View>
            </TouchableOpacity>
          )
        })
      }




    </ScrollView>
  );
}

export default Profile;
