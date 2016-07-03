import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, AlertIOS } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as chazActions from '../actions/chazActions';

import styles from '../styles/styles.js';
const constants = styles.constants;


class ActionButton extends Component {




  onAddRecPress() {
    var Options = Array();
    Options.push({ text: 'Add New Recommendation', onPress: (textInput) => {this.props.actions.addRec(textInput)} })
    // var recrs = this.props.state.recrs.map((recr) => {
    //   Options.push({text: `Recommended by ${recr.name}`, onPress: (textInput) => {this.props.actions.addRecWithRecr(textInput,recr)} });
    // });
    Options.push({text: 'Cancel', onPress: (text) => console.log('action canelled') });
    AlertIOS.prompt('What is someone recommending?',null,Options);
  }


  render() {
      return (
        <View style={styles.action}>
          <TouchableHighlight
            underlayColor={constants.actionColor}
            onPress={this.onAddRecPress.bind(this)}
            style={styles.actionTouch}>
            <Text style={styles.actionText}>{this.props.title}</Text>
          </TouchableHighlight>
        </View>
      );
    }
  }
  // module.exports = ActionButton;



  // I do not understand any of this..
  export default connect(state => ({
    state: state.chaz // Grabs data from the reducer
  }),
  (dispatch) => ({
    actions: bindActionCreators(chazActions, dispatch)
  })
  )(ActionButton);
