import React, {Component} from 'react';
import { Text, View, TouchableOpacity, ListView } from 'react-native';
import styles from './styles';
import WidgetContainer from './WidgetContainer';

class NeedsRecr extends Component {

  render() {

    return (
      <WidgetContainer icon="sleeping" title="Who recommended these?" >
      <View style={{flex: 1}}>
      { this.renderRecs() }
    </View>
  </WidgetContainer>
    );
  }

  renderRecs() {
    const { recs } = this.props.data;
    const displayRecs = [];
    for(rec of recs) {
      displayRecs.push(this.renderRec(rec));
    }
    return displayRecs;
  }


  renderRec(rec) {
    const { onPress } = this.props.data;
    return(
      <TouchableOpacity key={rec._id} onPress={onPress.bind(this,rec)} >
        <View style={styles.item}>
          <Text>{rec.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }


}

export default NeedsRecr;
