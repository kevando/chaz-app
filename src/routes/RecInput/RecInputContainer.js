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
      headerText: 'Add Rec',
      handleSaveRec: this.addRec.bind(this),
      navigator: this.props.navigator, // maybe not the best approach
    };
  }
  componentDidMount() {

    const { rec } = this.props;

    // if rec exists, then we are editing instead of adding
    if(rec) {
      this.setState({
        title: rec.title,
        note: rec.note,
        headerText: 'Edit Rec',
        handleSaveRec: this.updateRec.bind(this,rec)
      });
    }

  }


  addRec(){
    console.log('addRec');
    const { title, note, navigator } = this.state;
    //
    const rec = {title, note, uid: Meteor.userId()}
    //



    Meteor.call('addRec',rec,function(err,res){
      console.log('added rec',err)
      console.log('added rec',res)
      // Might need to add the id from meteor to the rec object.
      navigator.replace(Routes.getRecRoute(rec));
    })

  }
  updateRec(rec){
    console.log('updateRec', rec);

    const { title, note, navigator } = this.state;
    //
    rec.title = title;
    rec.note = note;
    //

    Meteor.call('updateRec',rec,function(err,res){
      console.log('updated rec',err)
      console.log('updated rec',res)
      // Might need to add the id from meteor to the rec object.
      navigator.replace(Routes.getRecRoute(rec));
    })

  }

  render() {
    const { handleSaveRec } = this.state;
    return (
      <RecInput
        headerText={ this.state.headerText }
        updateState={this.setState.bind(this)}
        saveRec={handleSaveRec}
        {...this.state}
      />
    );
  }
}

export default RecInputContainer;
