import React, { PropTypes } from 'react';
import { Text, View, ListView, TouchableOpacity } from 'react-native';
import { MeteorListView } from 'react-native-meteor';
import Loading from '../../components/Loading';
import styles from './styles';

const Categories = ({ dataSource, onPress }) => {

  return (
    <View style={styles.container}>
      <ListView
        contentContainerStyle={styles.list}
        dataSource={dataSource}
        renderRow={(rowData) => <TouchableOpacity style={styles.item} onPress={() => onPress(rowData.id)}><Text style={styles.itemText} >{rowData.label}</Text></TouchableOpacity>}
      />
    </View>
  );
};

// Categories.propTypes = {
//   dataSource: PropTypes.bool,
// };

export default Categories;
