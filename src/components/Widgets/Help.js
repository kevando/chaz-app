import React, {Component} from 'react';
import { Text, View, AlertIOS} from 'react-native';
import styles from './Styles';
import WidgetContainer from './WidgetContainer';
import Button from '../Button';

var Mailer = require('NativeModules').RNMail;

export default class Help extends Component {

  handleFeedback() {
    Mailer.mail({
      subject: 'chaz feedback',
      recipients: ['khabich@gmail.com'],
      // ccRecipients: ['supportCC@example.com'],
      // bccRecipients: ['supportBCC@example.com'],
      body: '',
      isHTML: true, // iOS only, exclude if false
      // attachment: {
      //   path: '',  // The absolute path of the file from which to read data.
      //   type: '',   // Mime Type: jpg, png, doc, ppt, html, pdf
      //   name: '',   // Optional: Custom filename for attachment
      // }
    }, (error, event) => {
        if(error) {
          AlertIOS.alert('Error', 'Could not send mail. Please send a mail to khabich@gmail.com');
        }
    });
  }

  render() {
    const { recs, recrs } = this.props.data;

    return (
      <WidgetContainer icon="sos" title="Help" >

          <View style={styles.widgetButton}>
            <Text>Confused about something?</Text>
            <Text>Ask your questions here.</Text>
            <Button text='Send Feedback' color='black' bgcolor='lightGrey' onPress={this.handleFeedback} />
          </View>

      </WidgetContainer>
    );
  }
}
