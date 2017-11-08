import React from 'react';
import { View ,Text, TextInput, Button } from 'react-native';
import _ from 'lodash';

import { Label } from '../../components/Generic';
// import { FriendCard } from '../../components/Friend';

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
  const { onLogoutPress, user, friends, givenRecs, onlineFriends } = props;

  return (
    <View style={styles.container}>


      <Text style={styles.title} onPress={onLogoutPress}>{user.displayName}</Text>


      { friends.length == 0 &&
        <View>
        <Label center>You are alone.</Label>
        <Animatable.View animation="fadeIn" delay={1000}>
          <Label center>Get your friends on chaz by clicking their name</Label>
        </Animatable.View>
        </View>
      }

      { friends.length == 1 &&
        <Label center title>You have 1 friend.</Label>
      }

      { friends.length > 1 &&
        <Label center title>You have {friends.length} friends.</Label>
      }

      {
        _.map(friends,(friend,i) => {
          return <Label center key={i}>{friend.name} {friend.uid && '(online)'}</Label>
        })
      }




    </View>
  );
}

export default Profile;
