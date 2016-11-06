import React, {Component} from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import _ from 'lodash';
import TextItem from '../TextItem';
import * as Button from '../Button';
import styles from './Styles';
import WidgetContainer from './WidgetContainer';

class TvQueue extends Component {

  render() {
    const { onPress, recs } = this.props.data;

    if(recs.all.length > 0){
      return (
        <WidgetContainer icon="tv" title="TV Shows" >
          <TouchableOpacity onPress={onPress} >
            <View style={styles.widgetButton}>
              <Text style={styles.bold}>Latest Recommendations</Text>
              {
                _.map(recs.all, (rec, i) => {
                return (
                  <TouchableOpacity key={i} onPress={onPress.bind(this,rec)} style={styles.listItem}>
                    <TextItem title={`${rec.recr.name} recommended ${rec.title}`} />
                    </TouchableOpacity>
                  );
                })
              }

              {recs.length > 3 ?
                <Button.Queue category="tv" />
              : null }


            </View>
          </TouchableOpacity>
        </WidgetContainer>
      );
    } else {
      return <View/>
    }
  }


}

export default TvQueue;
