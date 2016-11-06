import React, {Component} from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import _ from 'lodash';
import TextItem from '../TextItem';
import * as Button from '../Button';
import styles from './Styles';
import WidgetContainer from './WidgetContainer';

class TvQueue extends Component {

  render() {
    const { onRecPress, recs } = this.props.data;

    if(recs.all.length > 0){
      return (
        <WidgetContainer icon="tv" title="TV Shows" >

            <View style={styles.widgetButton}>
            <Text style={styles.bold}>Unwatched Recommendations</Text>
              {
                _.map(recs.queue, (rec, i) => {
                return (
                  <TouchableOpacity key={i} onPress={onRecPress.bind(this,rec)} style={styles.listItem}>
                    <TextItem title={`${rec.title}`} />
                    </TouchableOpacity>
                  );
                })
              }

              {recs.length > 3 ?
                <Button.Queue category="tv" />
              : null }


            </View>

        </WidgetContainer>
      );
    } else {
      return <View/>
    }
  }


}

export default TvQueue;
