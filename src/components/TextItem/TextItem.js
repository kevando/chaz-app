import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Emoji from 'react-native-emoji';
import { colors } from '../../config/styles';

const TextItem = ({title, note, icon, size=1 }) => {

  return (
    <View style={styles.container}>
      {icon ?
      <View style={styles.left}>
        <Text style={styles.icon}><Emoji name={icon} /></Text>
      </View>
      : null }

      <View style={styles.right}>
        <Text style={titleStyle(size)}>{title}</Text>
        {note ?
          <Text style={styles.note}>{note}</Text>
        : null }
      </View>

    </View>


  );
};

// Should probly go somewhere else
function titleStyle(size) {
  return {
    // paddingBottom: 8,
    fontSize: 14*size,
    fontWeight: '300',
    color: colors.black,
    // marginTop:5
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'yellow',
  },
  left: {
    flex: 1,
    // backgroundColor:'blue',
  },

  right: {
    flex: 7,
    // backgroundColor:'red',
    justifyContent: 'center', // vertical align
  },

  icon: {
    fontSize: 40,
  },




});

export default TextItem;
