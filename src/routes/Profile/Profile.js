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
  const { user, friends, givenRecs, onlineFriends, formatedNumber } = props;

  return (
    <ScrollView style={styles.container}>

      <View style={styles.headerContainer}>
        <Text style={styles.title}>{user.displayName}</Text>
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
            <TouchableOpacity key={i} onPress={()=>Actions.push('FriendView',{friend})}>
            <View style={styles.friendRowItem} >
              <Icon name='user' size={19} color={friend.uid ? colors.pink : colors.darkGrey}/>
              <Text style={styles.friendText} >{friend.name || friend.displayName+ ' (Pending)'}</Text>
            </View>
            </TouchableOpacity>
          )
        })
      }




    </ScrollView>
  );
}

export default Profile;
