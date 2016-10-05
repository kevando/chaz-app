import React, { PropTypes } from 'react';
import { Text, View, ListView } from 'react-native';
import { MeteorListView } from 'react-native-meteor';
import Loading from '../../components/Loading';
import styles from './styles';

const Categories = ({ dataSource }) => {

  return (
    <View style={styles.container}>
      <ListView
        dataSource={dataSource}
        renderRow={(rowData) => <Text>{rowData.label}</Text>}
      />
    </View>
  );
};

// Categories.propTypes = {
//   dataSource: PropTypes.bool,
// };

export default Categories;
