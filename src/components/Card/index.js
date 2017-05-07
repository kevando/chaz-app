import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Swipeout from 'react-native-swipeout';
import moment from 'moment';

import styles from './styles';
import SetReminder from '../../components/SetReminder';

const Icon = ({status}) => {
  var icon = '🗯';
  if(status == 'unfinished')  icon = '🗣';
  if(status == 'new')         icon = '🗓';
  if(status == 'finished')     icon = '🖼';

  return <Text style={{fontSize: 30}}>{icon}</Text>
}

const Card = ({ rec, setStatus, setReminder, deleteRecommendation, notificationPermission }) => {

  const swipeButtons = {
    right: [
      {
        text: 'DELETE',
        backgroundColor: 'red',
        onPress: () => {
          deleteRecommendation(rec.id)
        },
      }
    ],
    left: [
      {
        text: ' 👍 ',
        backgroundColor: 'blue',
        onPress: () => {
          setStatus(rec.id, 'finished')
        },
      },
      {
        text: ' 👎 ',
        backgroundColor: 'red',
        onPress: () => {
          setStatus(rec.id, 'finished')
        },
      }
    ]
  }



  return (
    <Swipeout left={swipeButtons.left} right={swipeButtons.right} style={{backgroundColor: '#fff'}} autoClose={true}>
      <View style={styles.container}>

        <View style={styles.iconContainer}>
          <Icon status={rec.status} />
        </View>

        <View style={styles.textContainer}>

          <View style={styles.recContainer}>
            <Text style={styles.rec}>{rec.title}</Text>
          </View>

          <View style={styles.friendContainer}>
            <Text style={styles.friend}>Recommended by: <Text style={styles.bold}>{rec.friend}</Text></Text>
          </View>

          <View style={styles.friendContainer}>
            {!rec.reminder &&
              <SetReminder setReminder={setReminder} rec={rec} notificationPermission={notificationPermission}/>
            }
          </View>

        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{moment(rec.createdAt).fromNow() }</Text>
        </View>

      </View>
    </Swipeout>
  );
};

Card.propTypes = {
  rec: React.PropTypes.object,
  // friend: React.PropTypes.string,
  onPress: React.PropTypes.func,
};

Card.defaultProps = {
  rec: {title: 'DUMMY', friend: 'duude'},
  onPress: () => console.log('Button Pressed'),
};

export default Card;
