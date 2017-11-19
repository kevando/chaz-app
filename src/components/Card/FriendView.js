import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';
import _ from 'lodash'
import { Actions} from 'react-native-router-flux';
import { Categories } from '../../components/Category';
import { Label, Button } from '../../components/Generic/';

import { colors } from '../../config/styles';
import styles from './styles';
// const Permissions = require('react-native-permissions');
// var PushNotification = require('react-native-push-notification');

//
// export class NameCard extends Component {
// render() {
//   const { friend } = this.props;
//   return (
//     <View>
//         <View style={[styles.container,{marginHorizontal:0,marginVertical: 0, flexDirection: 'row',paddingVertical: 20}]}>
//         <View style={styles.iconContainer}>
//                   <Icon name='user' color={friend.uid ? colors.orange : colors.grey} size={30} />
//                 </View>
//         <View style={styles.textContainer}>
//           <View style={styles.recContainer}>
//           {friend.uid ?
//             <Text style={styles.recText}>{friend.name}</Text> :
//             <Text style={[styles.recText,{color:colors.darkGrey}]}>{friend.name}</Text>
//           }
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }
// };

//
// export class FriendHeader extends Component {
// render() {
//   const { friend } = this.props;
//   return (
//     <View>
//         <View style={{flex:1,marginTop: 40,}}>
//
//         <View style={styles.textContainer}>
//
//             <Text style={{fontSize: 30,textAlign: 'center', color: 'white'}}>{friend.name}</Text>
//           </View>
//         </View>
//       </View>
//   );
// }
// };
export class UserCard extends Component {
render() {
  const { friend } = this.props;
  return (
    <View>
      <Text style={styles.label}>This person is on chaz!</Text>
        <View style={[styles.container]}>
        <View style={styles.textContainer}>
          <View style={styles.recContainer}>
            <Text style={styles.recText}>{friend.name} is @{friend.username} on chaz!</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
};
//
// export class FindUserCard extends Component {
//   onSubmitPress() {
//     alert('dude')
//   }
// render() {
//   const { friend, onKeyPress, validPhoneNumber, sendInvite } = this.props;
//   return (
//     <View>
//
//       <Label center>Find your friends to chaz and you can send them recommendations directly in the app</Label>
//
//         <View style={[styles.container]}>
//
//         <View style={styles.inputContainer}>
//           <TextInput
//             placeholder='Phone Number'
//             keyboardType='phone-pad'
//             autoCorrect={false}
//             multiline={false}
//             style={styles.input}
//             placeholderTextColor={colors.grey}
//             onChangeText={(phoneNumber) => onKeyPress(phoneNumber)}
//           />
//         </View>
//
//       </View>
//       { validPhoneNumber && <Button text="Send Invite" onPress={sendInvite}/> }
//     </View>
//   );
// }
// };
export class RecCard extends Component {
render() {
  const { rec } = this.props;
  return (
    <View>
        <View style={[styles.container]}>
        <View style={styles.textContainer}>
          <View style={styles.recContainer}>
            <Text style={styles.recText}>{rec.title}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
};
//
