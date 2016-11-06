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
              <Text style={styles.text}>Thank you for participating in the beta test.</Text>
              <Text style={styles.text}>&nbsp;</Text>
              <Text style={styles.text}>This is your home screen and it will populate with widgets (like this one) as you use the app.</Text>
              <Text style={styles.text}>&nbsp;</Text>
              <Text style={styles.text}>You can always scroll to the bottom of this screen and send me a question.</Text>
              <Text style={styles.text}>&nbsp;</Text>
              <Text style={styles.text}> - Kevando</Text>
            </View>
        </WidgetContainer>
      );
    } else {
      return <View />
    }
  }

}

export default Onboarding;
