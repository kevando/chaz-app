import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Emoji from 'react-native-emoji';
import { colors } from '../../config/styles';

const TextItem = ({title, note, icon, size=1 }) => {



  return (
    <View style={styles.container}>
      {icon ?
      <View style={styles.left}>
        <Text style={[styles.icon,iconSize(size)]}><Emoji name={icon} /></Text>
      </View>
      : null }

      <View style={styles.right}>
        <Text style={[styles.title,titleStyle(size)]}>{title}</Text>
        {note ?
          <Text style={styles.note}>{note}</Text>
        : null }
      </View>

    </View>


  );
};

function titleStyle(size) {
  if(size == 2) {
    return {
      fontSize: 20,
      fontWeight: '500',
    }
  } else if(size == 3) {
    return {
      fontSize: 24,
      fontWeight: '600',
    }
  }

}
function iconSize(size) {
  if(size == 2) {
    return { fontSize: 20, }
  } else if(size == 3) {
    return { fontSize: 55,}
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'yellow',
  },
  left: {
    flex: 2,
    // backgroundColor:'blue',
    justifyContent: 'center', // vertical align
    alignItems: 'center',
  },
  right: {
    flex: 7,
    // backgroundColor:'red',
    justifyContent: 'center', // vertical align
  },
  icon: {
    fontSize: 20,
    padding:10,
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.black
  },
});

export default TextItem;
