import React, { Component } from 'react';
import RecrInput from './RecrInput';
import Routes from '../../config/routes';
import Meteor from 'react-native-meteor';

export default class RecrInputContainer extends Component {
  constructor(props) {
    super(props);

    this.mounted = false;
    this.state = {
      name: '',
      recr: {},
      rec: this.props.rec
    };
  }

  handleAddRecr(){
    const { name, navigator } = this.state;
    const recr = {name, uid: Meteor.userId(), createdAt: Date.now() }
    Meteor.call('addRecr',recr);
  }

  handleAssignRecr() {
    const { rec, recr } = this.state;
    rec.recr_id = recr._id;

    Meteor.call('updateRec',rec,function(err,res){
      // Might need to add the id from meteor to the rec object.
      // navigator.replace(Routes.getRecRoute(recr));
    })

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
