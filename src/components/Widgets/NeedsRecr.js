import React, {Component} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import _ from 'lodash';
import styles from './Styles';
import Categories from '../../lib/Categories';
import TextItem from '../TextItem';
import WidgetContainer from './WidgetContainer';

class NeedsRecr extends Component {

  render() {
    const { recs, onPress } = this.props.data;

    if(recs.length < 1 )
      return (<View></View>);

    return (
      <WidgetContainer icon="no_mouth" title="Who recommended these?" >
        <View style={{flex: 1}}>
        {
          _.map(recs, (rec, i) => {
          return (
            <TouchableOpacity key={i} onPress={onPress.bind(this,rec)} style={styles.listItem}>
              <TextItem title={rec.title} note={rec.note} icon={Categories[rec.category].icon} />
              </TouchableOpacity>
            );
          })
        }
        </View>
      </WidgetContainer>
    );
  }
}

export default NeedsRecr;
