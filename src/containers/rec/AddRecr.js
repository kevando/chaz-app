import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  AlertIOS,
  ActionSheetIOS
} from 'react-native';
import { connect } from 'react-redux';
import * as recActions from '../../reducers/rec/actions';
import * as recrActions from '../../reducers/recr/actions';

import * as Style from '../../style/Style';


// this is a traditional React component connected to the redux store
class addRecr extends Component {


  constructor(props) {
    super(props);
    this.onAddRecrPress = this.onAddRecrPress.bind(this);
  }

  render() {
      return (
        <TouchableOpacity onPress={ this.onAddRecrPress }>
          <Text>{this.props.text}</Text>
        </TouchableOpacity>
      )
  }

  openAddRecrModal(){
    var options = Array();
    options.push({text: 'Add New',  onPress: (recrName) => { this.addRecr(recrName) }    });
    options.push({text: 'Cancel', onPress: (text) => console.log('action canelled') });
    AlertIOS.prompt('Who is recommending this?', null, options);
  }

  onAddRecrPress(itemRec) {// i feel like this fn does too much
    // Before adding recr name, set this listItem Rec to current.
    // this is not the best place for this, but its needed to add recr
    // yeah def refactor this shit
    this.props.dispatch(recActions.setCurrentRec(this.props.rec));
    // yeah change this somehow
    // change this when i add this to the rec view

    recrsArray = [];
    var recrs = this.props.recr.all;
    recrs.map(function (recr) {
      recrsArray.push(recr.name);
    });
    recrsArray.push('Add New Friend');
    recrsArray.push('Cancel')

    var DESTRUCTIVE_INDEX = recrs.length;
    var CANCEL_INDEX = recrs.length+1;
    ActionSheetIOS.showActionSheetWithOptions({
      title: 'Who is recommending this?',
      options: recrsArray,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      tintColor: 'green',
    },
    (buttonIndex) => {
      if(buttonIndex == CANCEL_INDEX){
        return;
      } else if (buttonIndex == DESTRUCTIVE_INDEX) {
        this.openAddRecrModal(itemRec);
      } else {
        this.addRecr(recrsArray[buttonIndex]);
      }
    });

  }
  addRecr(recrName) {
    // create new recr if new
    // update current with updated rec info
    this.props.dispatch(recrActions.createRecr(recrName));
  }
}

function mapStateToProps(state) {
  return {
    recr: state.recr,
  };
}

export default connect(mapStateToProps)(addRecr);
