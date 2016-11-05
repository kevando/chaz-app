import React, {Component} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './Styles';
import WidgetContainer from './WidgetContainer';

class NeedsRecr extends Component {

  render() {
    const { recs } = this.props.data;

    if(recs.length < 1 )
      return (<View></View>);

    return (
      <WidgetContainer icon="no_mouth" title="Who recommended these?" >
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
        <View style={styles.recrItem}>
          <Text style={styles.recTitle}>{rec.title}</Text>
          <Text style={styles.recNote}>{rec.note}</Text>
        </View>
      </TouchableOpacity>
    );
  }


}

export default NeedsRecr;
