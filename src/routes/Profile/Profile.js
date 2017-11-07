import React from 'react';
import { View ,Text, TextInput, Button } from 'react-native';
import _ from 'lodash';

import { Label } from '../../components/Generic';
// import { FriendCard } from '../../components/Card/RecView';
// import Card  from '../../components/Card/Rec';
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
  console.log(props)
  const { onLogoutPress, user, friends, givenRecs, onlineFriends } = props;

  return (
    <View style={styles.container}>


      <Text style={styles.title} onPress={onLogoutPress}>{user.displayName}</Text>


      { onlineFriends.length == 0 &&
        <View>
        <Label center>You are alone.</Label>
        <Animatable.View animation="fadeIn" delay={1000}>
          <Label center>Get your friends on chaz by clicking their name</Label>
        </Animatable.View>
        </View>
      }

      { onlineFriends.length == 1 &&
        <Label center>You have 1 friend.</Label>
      }

      { onlineFriends.length > 1 &&
        <Label center>You have {onlineFriends.length} friends.</Label>
      }

      {
        _.map(friends,friend => {
          // return <FriendCard key={friend.id} friend={friend} />
        })
      }

      {
          givenRecs.length > 0 &&
            <GivenRecs givenRecs={givenRecs} />
      }



    </View>
  );
}

export default Profile;
