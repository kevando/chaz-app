import React, { PropTypes } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import RecCategory from '../../components/RecCategory';
import TextItem from '../../components/TextItem';
import Categories from '../../lib/Categories';
import moment from 'moment';
import Emoji from 'react-native-emoji';

const Rec = ({ rec, onRecrEditPress, updateState, onGradeRecPress, onRecrPress, updateGrade, getGradeStyle, grade }) => {

  var d = new Date(rec.createdAt);
  var savedAgo = moment(d).fromNow();



  return (

    <View style={styles.container}>

      <View style={styles.recContainer}>

        <View style={styles.titleContainer}>
          <TextItem title={rec.title} icon={Categories[rec.category].icon} size={3} />

        </View>

        <Text style={styles.dateText}>Saved {savedAgo}</Text>

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
            <Text style={styles.dateText}>What did you think?</Text>

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




      </View>

      <View style={styles.buttonContainer}>
      {rec.recr_id ?
        null
        :
        <Button onPress={onRecrEditPress} text="Who Recommended this?" color="green" />
      }
      </View>


    </View>

  );
};

Rec.propTypes = {
  rec: PropTypes.object,
};

export default Rec;
