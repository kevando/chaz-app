import React, {Component} from 'react';
import { Text, View, } from 'react-native';
import styles from './Styles';
import WidgetContainer from './WidgetContainer';

export default class Help extends Component {

  render() {
    const { recs, recrs } = this.props.data;

    return (
      <WidgetContainer icon="sos" title="Help" >

          <View style={styles.widgetButton}>
            <Text>Confused about something?</Text>
            <Text>Ask your question here</Text>
          </View>

      </WidgetContainer>
    );
  }
}
