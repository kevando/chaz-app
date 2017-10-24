import React from 'react';
import { View ,Text, TextInput, Button } from 'react-native';
import _ from 'lodash';

import { Label } from '../../components/Generic';
import { FriendCard } from '../../components/Card/RecView';

import styles from './styles';

const Profile = (props) => {
  // console.log(props)
  const { onLogoutPress, user, friends, givenRecs } = props;

  return (
    <View style={styles.container}>


      <Text style={styles.title} onPress={onLogoutPress}>username{user.username}</Text>


      <Label>Your Friends</Label>
      {
        _.map(friends,friend => {
          return <FriendCard key={friend.id} friend={friend} />
        })
      }

      {
          givenRecs ?
          <Label>Your given</Label>
          :
          <Label center>Recommend your favorite stuff to people on chaz</Label>
      }



    </View>
  );
}

export default Profile;
