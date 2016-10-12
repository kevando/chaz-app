import React, { Component } from 'react';
import { LayoutAnimation } from 'react-native';
import Meteor, { Accounts } from 'react-native-meteor';
import RecInput from './RecInput';
import Routes from '../../config/routes';

class RecInputContainer extends Component {
  constructor(props) {
    super(props);

    this.mounted = false;
    this.state = {
      title: '',
      note: '',
      category: 'uncategorized',
      headerText: 'Add Rec',
      handleSaveRec: this.addRec.bind(this),
      navigator: this.props.navigator, // maybe not the best approach
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
        headerText: 'Edit Rec',
        handleSaveRec: this.updateRec.bind(this,rec)
      });
    }
  }

  addRec(){
    const { title, note, category, navigator } = this.state;
    var rec = {title, note, category, uid: Meteor.userId(), createdAt: Date.now()}

    Meteor.call('addRec',rec,function(err,res){
      //res is the rec ID
      rec._id = res; // better way to do this?
      navigator.replace(Routes.getRecRoute(rec));
    })
  }

  updateRec(rec){
    const { title, note, category, navigator } = this.state;

    rec.title = title;
    rec.note = note;
    rec.category = category;

    Meteor.call('updateRec',rec,function(err,res){
      // Might need to add the id from meteor to the rec object.
      navigator.replace(Routes.getRecRoute(rec));
    })
  }

  render() {
    const { handleSaveRec } = this.state;
    const { rec } = this.props;
    return (
      <RecInput
        rec={rec}
        headerText={ this.state.headerText }
        updateState={this.setState.bind(this)}
        saveRec={handleSaveRec}
        {...this.state}
      />
    );
  }
}

export default RecInputContainer;
