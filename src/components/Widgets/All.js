import React, {Component} from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import _ from 'lodash';
import TextItem from '../TextItem';
import * as Button from '../Button';
import styles from './Styles';
import WidgetContainer from './WidgetContainer';

class All extends Component {

  render() {
    const { onPress, recs } = this.props.data;

    if(recs.length > 2){
      return (
        <WidgetContainer icon='earth_africa' title='All Recommendations' onPress={onPress}>
            <View style={styles.categoryContent}>
            <View ref='options'>

            <View><Text>{recs.length} Recommendations</Text></View>

            </View>

            </View>
        </WidgetContainer>
      );
    } else {
      return <View/>
    }
  }


}

export default All;
