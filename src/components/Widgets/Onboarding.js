import React, {Component} from 'react';
import { Text, View, TouchableOpacity, } from 'react-native';
import styles from './Styles';
import WidgetContainer from './WidgetContainer';

class Onboarding extends Component {

  render() {
    const { recs} = this.props.data;

    if(recs.length == 0){
      return (
        <WidgetContainer icon="moyai" title="Welcome to chaz" >
            <View style={styles.widgetButton}>
              <Text style={styles.text}>As you save recommendations, they will show up here.</Text>
              <Text style={styles.text}>&nbsp;</Text>
              <Text style={styles.text}>Get started by saving your first recommendation.</Text>
              <Text style={styles.text}>&nbsp;</Text>
              <Text style={styles.text}> Thanks, Kevando</Text>
            </View>
        </WidgetContainer>
      );
    } else {
      return <View />
    }
  }

}

export default Onboarding;
