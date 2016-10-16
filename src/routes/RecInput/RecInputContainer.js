import React, { Component } from 'react';
import { LayoutAnimation } from 'react-native';
import Meteor, { Accounts } from 'react-native-meteor';
import RecInput from './RecInput';
import Routes from '../../config/routes';
var dismissKeyboard = require('dismissKeyboard');

class RecInputContainer extends Component {
  constructor(props) {
    super(props);

    this.mounted = false;
    this.state = {
      title: '',
      note: '',
      category: 'uncategorized',
      headerText: 'Add ',
      handleSaveRec: this.addRec.bind(this),
    };
  }

  componentDidMount() {

    const { rec } = this.props;

    // if rec exists, then user is editing
    if(rec) {
      this.setState({
        title: rec.title,
        note: rec.note,
        category: rec.category,
        headerText: 'Edit ',
        handleSaveRec: this.updateRec.bind(this,rec)
      });
    }
  }

  addRec(){
    const { title, note, category } = this.state;
    const { navigator } = this.props;
    var rec = {title, note, category, uid: Meteor.userId(), createdAt: Date.now()}

    Meteor.call('addRec',rec,function(err,res){
      //res is the rec ID
      rec._id = res; // better way to do this?
      navigator.replace(Routes.getRecRoute(rec));
    })
  }

  updateRec(rec){
    const { title, note, category } = this.state;
    const { navigator } = this.props;
    rec.title = title;
    rec.note = note;
    rec.category = category;

    Meteor.call('updateRec',rec,function(err,res){
      // Might need to add the id from meteor to the rec object.
      navigator.replace(Routes.getRecRoute(rec));
    })
  }
  deleteRec(rec){
    const { navigator } = this.props;

    Meteor.call('deleteRec',rec,function(err,res){
      // Might need to add the id from meteor to the rec object.
      navigator.resetTo(Routes.getHomeRoute());
    })
  }

  removeRecr(rec){
    rec.recr_id = null
    Meteor.call('updateRec',rec)
  }
  removeGrade(rec){
    rec.grade = null
    Meteor.call('updateRec',rec)
  }

  onDismiss() {
    const { navigator } = this.props;
    dismissKeyboard();
    navigator.pop();
  }

  render() {
    const { handleSaveRec } = this.state;
    const { rec, initial, navigator } = this.props;
    return (
      <RecInput
        rec={rec}
        onRemoveRecrPress={ this.removeRecr }
        onRemoveGradePress={ this.removeGrade }
        onDeleteRecPress={ this.deleteRec.bind(this) }
        initial={initial}
        onDismiss={this.onDismiss.bind(this)}
        headerText={ this.state.headerText }
        updateState={this.setState.bind(this)}
        saveRec={handleSaveRec}
        {...this.state}
      />
    );
  }
}

export default RecInputContainer;
