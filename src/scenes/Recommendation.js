import React, { Component } from 'react';
import {View, Text, StyleSheet} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import { bindActionCreators } from 'redux'
import * as recActions from '../reducers/rec/actions';
import RecNote from '../components/RecNote';
import {connect} from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class RecView extends Component {

  render(){
    let { dispatch } = this.props;
    let boundActionCreators = bindActionCreators(recActions, dispatch)

    var {rec} = this.props;
    return (
      <View  style={{flex:1}}>
        <Text>{rec.title}</Text>
        <RecNote rec={rec} {...boundActionCreators} />
        <Text>------------------------</Text>
        <Button onPress={this.deleteRec.bind(this)}>Delete Rec</Button>

        <KeyboardSpacer />
      </View>
    );
  }

  deleteRec(){
    var id = this.props.id;
    this.props.dispatch(recActions.deleteRec(id));
    Actions.pop();
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
  };
}
export default connect(mapStateToProps)(RecView);
