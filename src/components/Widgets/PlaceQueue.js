import React, {Component} from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import styles from './styles';
import WidgetContainer from './WidgetContainer';

class PlaceQueue extends Component {

  render() {
    const { onPress, recs} = this.props.data;

    if(recs.length > 0){
      return (
        <WidgetContainer icon="desert_island" title="Places" >
          <TouchableOpacity onPress={onPress} >
            <View>
              <Text>You have {recs.length} uncateogorized recs</Text>
            </View>
          </TouchableOpacity>
        </WidgetContainer>
      );
    } else {
      return <View></View>
    }
  }


}

export default PlaceQueue;
