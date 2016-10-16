import React, { PropTypes } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import RecCategory from '../../components/RecCategory';
import moment from 'moment';
import Emoji from 'react-native-emoji';

const Rec = ({ rec, onRecrEditPress, updateState, onGradeRecPress, onRecrPress, updateGrade, getGradeStyle, grade }) => {

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
          <TouchableOpacity onPress={onRecrPress} >
            <Text>Recommended by <Text style={styles.recr}>{rec.recr.name}</Text></Text>
          </TouchableOpacity>
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
        <View>
          <Text style={styles.dateText}>Your feedback</Text>

          <View style={styles.gradeContainer}>

            <TouchableOpacity onPress={updateGrade.bind(this,1)}><Text style={[styles.grade,getGradeStyle(1)]}><Emoji name="yellow_heart" /></Text></TouchableOpacity>
            <TouchableOpacity onPress={updateGrade.bind(this,2)}><Text style={[styles.grade,getGradeStyle(2)]}><Emoji name="yellow_heart" /></Text></TouchableOpacity>
            <TouchableOpacity onPress={updateGrade.bind(this,3)}><Text style={[styles.grade,getGradeStyle(3)]}><Emoji name="yellow_heart" /></Text></TouchableOpacity>
            <TouchableOpacity onPress={updateGrade.bind(this,4)}><Text style={[styles.grade,getGradeStyle(4)]}><Emoji name="yellow_heart" /></Text></TouchableOpacity>
            <TouchableOpacity onPress={updateGrade.bind(this,5)}><Text style={[styles.grade,getGradeStyle(5)]}><Emoji name="yellow_heart" /></Text></TouchableOpacity>
          </View>
          {grade && ! rec.grade ? <Button onPress={onGradeRecPress} text="Save Your Feedback" /> : null }
        </View>

        : null
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
