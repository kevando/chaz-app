import React, {Component} from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import _ from 'lodash';
import styles from './Styles';
import WidgetContainer from './WidgetContainer';
import TextItem from '../TextItem';

class Uncategorized extends Component {

  render() {
    const { onPress, recs} = this.props.data;

    if(recs.length > 0){
      return (
        <WidgetContainer icon="card_index" title="Uncategorized Recommendations" >

            <View style={styles.widgetButton}>
            {
              _.map(recs, (rec, i) => {
              return (
                <TouchableOpacity key={i} onPress={onPress.bind(this,rec)} style={styles.listItem}>
                  <TextItem title={rec.title} />
                  </TouchableOpacity>
                );
              })
            }

            </View>

        </WidgetContainer>
      );
    } else {
      return <View></View>
    }
  }


}

export default Uncategorized;
