import React, { PropTypes, Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { MeteorListView } from 'react-native-meteor';
import Loading from '../../components/Loading';
import styles from './styles';



class ListItem extends Component {
  constructor(props) {
    super(props);

  }

  render(){
    var rec = this.props.rec;
    return(
      <TouchableOpacity onPress={props.onRecPress}><Text style={styles.item}>{rec.title}:</Text></TouchableOpacity>
    )
  }
}

const Recommendations = ({ detailsReady, onRecPress }) => {
  if (!detailsReady) {
    return <Loading />;
  }


  return (
    <View style={styles.container}>
      <MeteorListView
        contentContainerStyle={styles.list}
        collection="recs"
        renderRow={(rec) => <TouchableOpacity style={styles.item} onPress={() => onRecPress(rec)}><Text style={styles.itemFont}>{rec.title}:</Text></TouchableOpacity>}
      />
    </View>
  );
};

Recommendations.propTypes = {
  detailsReady: PropTypes.bool,
  onRecPress: PropTypes.func
};

export default Recommendations;
