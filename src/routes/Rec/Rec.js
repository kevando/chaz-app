import React, { PropTypes } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import moment from 'moment';

const Rec = ({ rec, recr, onRecEditPress, onRecrEditPress }) => {

  var d = new Date(rec.createdAt);
  var date = moment(d).format('MM/DD/YYYY');

  return (
    <View>
    <View style={styles.container}>
      
      <TouchableOpacity onPress={onRecEditPress}>
        <Text style={styles.title}>{rec.title}</Text>
        <Text style={styles.note}>{rec.note}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onRecrEditPress}>
        {recr ?
          <Text style={styles.recr}>Recommended by {recr.name}</Text>
          :
          <Text style={styles.recr}>Who recommended this?</Text>
        }
      </TouchableOpacity>


    </View>

    <View>
      <Text>{date}</Text>
    </View>
  </View>
  );
};

Rec.propTypes = {
  rec: PropTypes.object,
};

export default Rec;
