import React from 'react';
import { View ,Text, TextInput, Button } from 'react-native';
import _ from 'lodash';

import { Label } from '../../components/Generic';
// import { FriendCard } from '../../components/Card/RecView';
import Card  from '../../components/Card/Rec';

import styles from './styles';

const GivenRecs = ({givenRecs}) => {
  return (
    <View>
    <Label>Recommendations that I gave</Label>
    {
    _.map(givenRecs,rec => {
      return <Card key={rec.id} rec={rec} />
    })
  }
  </View>
  )
}

const Profile = (props) => {
  // console.log(props)
  const { onLogoutPress, user, friends, givenRecs } = props;

  return (
    <View style={styles.container}>


      <Text style={styles.title} onPress={onLogoutPress}>{user.name}</Text>


      <Label></Label>
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
