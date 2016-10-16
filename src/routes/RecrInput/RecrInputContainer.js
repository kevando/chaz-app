import React, { Component } from 'react';
import RecrInput from './RecrInput';
import Routes from '../../config/routes';
import Meteor from 'react-native-meteor';
var dismissKeyboard = require('dismissKeyboard');

export default class RecrInputContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      recr: {},
      rec: this.props.rec
    };
  }

  handleAddRecr(){
    const { name, navigator } = this.state;
    const updateState = this.setState.bind(this);
    var recr = {name, uid: Meteor.userId(), createdAt: Date.now() }

    Meteor.call('addRecr', recr, function(err,res){
      // set new recr and clear form
      recr._id = res
      updateState({name: '', recr: recr});
      dismissKeyboard();
    });

  }

  handleAssignRecr() {
    const { rec, recr } = this.state;
    const { navigator } = this.props;
    rec.recr_id = recr._id;
    rec.recr_name = recr.name;
    rec.recr_score = recr.score;

    Meteor.call('updateRec',rec,function(err,res){
      navigator.pop();
    });
  }

  render() {

    return (
      <RecrInput
        rec={this.props.rec}
        updateState={this.setState.bind(this)}
        addRecr={this.handleAddRecr.bind(this)}
        assignRecr={this.handleAssignRecr.bind(this)}
        {...this.state}
      />
    );
  }
}
