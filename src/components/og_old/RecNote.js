import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {colors} from '../style/Global';

export default class RecNote extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var {rec} = this.props;


    return (
      <View>
        <TouchableOpacity onPress={this.onNotePress.bind(this)}>
        {( rec.note
          ? <Text style={styles.note}>{rec.note}</Text>
          : <Text style={styles.empty}>Add a note...</Text>
        )}
        </TouchableOpacity>
      </View>
    );
  }
  onNotePress(){
    var {rec, onPress} = this.props
    onPress({rec: rec});
  }

}
const styles = StyleSheet.create({
  note: {
    fontSize: 18,
    color:colors.darkGrey,
  },
  empty: {
    fontSize: 18,
    color:colors.grey,
  }

})
