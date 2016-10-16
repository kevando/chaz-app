import React, {Component} from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import styles from './Styles';
import WidgetContainer from './WidgetContainer';

class MovieQueue extends Component {

  render() {
    const { onPress, recs} = this.props.data;

    if(recs.length > 0){
      return (
        <WidgetContainer icon="vhs" title="Movies" >
          <TouchableOpacity onPress={onPress} >
            <View style={styles.widgetButton}>
              <Text>Your unwatched movie recommendations</Text>
            </View>
          </TouchableOpacity>
        </WidgetContainer>
      );
    } else {
      return <View></View>
    }
  }


}

export default MovieQueue;
