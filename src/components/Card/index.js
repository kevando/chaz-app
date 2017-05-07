import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Swipeout from 'react-native-swipeout';
import moment from 'moment';

import styles from './styles';
import SetReminder from '../../components/SetReminder';

const Icon = (props) => {
  const {status, grade, reminder} = props.rec;
  var icon = '🗯';
  if(status == 'unfinished')  icon = '🗣';
  if(status == 'new')         icon = '📃';
  if(reminder)                icon = '⏰';
  if(grade === 1)             icon = '👍';
  if(grade === -1)            icon = '👎';

  return <Text style={{fontSize: 15}}>{icon}</Text>
}

const Card = ({ rec, setStatus, setGrade, setReminder, deleteRecommendation, notificationPermission }) => {

  const swipeButtons = {
    right: [
      {
        text: 'DELETE',
        backgroundColor: 'red',
        onPress: () => deleteRecommendation(rec.id),
      },
    ],
    left: [
      {
        text: ' 👍 ',
        backgroundColor: 'blue',
        onPress: () => {
          setStatus(rec.id, 'finished')
          setGrade(rec.id,1)
        },
      },
      {
        text: ' 👎 ',
        backgroundColor: 'red',
        onPress: () => {
          setStatus(rec.id, 'finished')
          setGrade(rec.id,-1)
        },
      }
    ]
  }



  return (
    <Swipeout left={swipeButtons.left} right={swipeButtons.right} style={{backgroundColor: '#fff'}} autoClose={true}>


      <View style={styles.container}>

        <View style={styles.iconContainer}>
          <Icon rec={rec} />
        </View>

        <View style={styles.textContainer}>

          <View style={styles.recContainer}>
            <Text style={styles.recText}>{rec.title}</Text>
          </View>

          <View style={styles.friendContainer}>
            <Text style={styles.friendText}>Recommended by: <Text style={styles.bold}>{rec.friend}</Text> {rec.status != 'unfinished' && moment(rec.createdAt).fromNow() }</Text>
          </View>


        </View>

        <View style={styles.dateContainer}>
        {!rec.reminder &&
          <SetReminder setReminder={setReminder} rec={rec} notificationPermission={notificationPermission}/>
        }

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


// <View style={styles.dateContainer}>
//   <Text style={styles.dateText}>{moment(rec.createdAt).fromNow() }</Text>
// </View>
