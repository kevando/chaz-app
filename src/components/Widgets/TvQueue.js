import React, {Component} from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import styles from './Styles';
import WidgetContainer from './WidgetContainer';

class TvQueue extends Component {

  render() {
    const { onPress, recs} = this.props.data;

    if(recs.length > 0){
      return (
        <WidgetContainer icon="tv" title="TV Shows" >
          <TouchableOpacity onPress={onPress} >
            <View style={styles.widgetButton}>
              <Text>You have {recs.length} TV show in your queue</Text>
              <Text>Click here to view your TV show Queue</Text>
            </View>
          </TouchableOpacity>
        </WidgetContainer>
      );
    } else {
      return <View></View>
    }
  }


}

export default TvQueue;
