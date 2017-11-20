import React, { Component } from 'react';
import { Text, View, TouchableOpacity, AlertIOS, StyleSheet } from 'react-native';
// var PushNotification = require('react-native-push-notification');
// const Permissions = require('react-native-permissions');
import Icon from 'react-native-vector-icons/Feather';
// import moment from 'moment';
// import firebase from 'react-native-firebase'
import { colors, text } from '../../config/styles';
import * as Animatable from 'react-native-animatable'
// import { Button } from './Generic'



class GradeSelector extends Component {

    _onHeartPress = () => {

      const { rec, setGrade } = this.props;

        AlertIOS.prompt(
          'What did you think?',
          'Select a grade, along with an optional message',
          [
            {text: '💙', onPress: (text) => setGrade(1,text)},
            {text: '💙💙', onPress: (text) => setGrade(2,text)},
            {text: '💙💙💙', onPress: (text) => setGrade(3,text)},
            {text: '💙💙💙💙', onPress: (text) => setGrade(4,text)},
            {text: '💙💙💙💙💙', onPress: (text) => setGrade(5,text)},
            {text: 'Nevermind', onPress: () => console.log('forget it'), style: 'cancel'},
          ]
        );


    }


    render() {

      const { rec } = this.props;


      return (
        <Animatable.View animation="pulse" iterationCount={'infinite'} duration={1000}>
          <Icon style={styles.optionIcon} onPress={this._onHeartPress} name="heart" color='white' />
        </Animatable.View>
      )


    }

};

const styles = StyleSheet.create({

  optionIcon: {
    padding: 5,
    margin: 5,
    fontSize: 17,
    // backgroundColor: 'yellow',
  },

});

export default GradeSelector
