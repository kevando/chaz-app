import React, { PropTypes } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import RecCategory from '../../components/RecCategory';
import moment from 'moment';
import Emoji from 'react-native-emoji';

const Rec = ({ rec, onRecrEditPress, updateState, onGradeRecPress }) => {

  var d = new Date(rec.createdAt);
  var savedAgo = moment(d).fromNow();

  console.log('rec',rec);

  return (

    <View style={styles.container}>

      <View style={styles.titleContainer}>
        <Text style={styles.emoji}><RecCategory category={rec.category} /></Text>

        <Text style={styles.title}>{rec.title}</Text>
      </View>

      <Text style={styles.dateText}>{savedAgo}</Text>

      <View style={styles.momentContainer}>
        {rec.recr_id ?
          <Text style={styles.recr}>Recommended by {rec.recr_name}</Text>
          :
          null
        }

        {rec.note ?
          <Text style={styles.note}>{rec.note}</Text>
          :
          <Text style={styles.note}>No note saved.</Text>
        }

      </View>


      {rec.recr_id ?

      <View style={styles.gradeContainer}>


                <View>
                  <TouchableOpacity onPress={() => updateState({ grade: 1 })} ><Text>1 star</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => updateState({ grade: 2 })} ><Text>2 stars</Text></TouchableOpacity>
                      <TouchableOpacity onPress={() => updateState({ grade: 3 })} ><Text>3 stars</Text></TouchableOpacity>
                  <TouchableOpacity onPress={onGradeRecPress}><Text>Submit Grade</Text></TouchableOpacity>
                </View>


      </View>

        : null
      }

      {!rec.grade ?
        null
        :
        <Text>grade is {rec.grade}</Text>
      }

      {!rec.recr_score ?
        null
        :
        <Text>overall score is {rec.recr_score.overall}</Text>
      }
      {!rec.recr_score ?
        null
        :
        <Text>cat score is {rec.recr_score[rec.category]}</Text>
      }

      {rec.recr_id ?
        null
        :
        <Button onPress={onRecrEditPress} text="Who Recommended this?" color="green" />
      }



    </View>

  );
};

Rec.propTypes = {
  rec: PropTypes.object,
};

export default Rec;
