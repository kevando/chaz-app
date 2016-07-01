import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableHighlight, ListView, AlertIOS, ActivityIndicatorIOS } from 'react-native';
import { bindActionCreators } from 'redux';
import * as chazActions from '../actions/chazActions';
import { connect } from 'react-redux';

const ActionButton = require('../components/ActionButton');
const FilterNav = require('../components/FilterNav');
const RecListItem = require('../components/RecListItem');

import * as styles from '../styles/styles.js';

class RecList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true,
    };
  }

  onItemPress(rec) {

    const { setRecGrade, removeRec } = this.props.actions;
    AlertIOS.alert(
        'Grade this recommendation',
        null,
        [
          {text: '1 Stars', onPress: (text) => setRecGrade(rec,1) },
          {text: '2 Stars', onPress: (text) => setRecGrade(rec,2) },
          {text: '3 Stars', onPress: (text) => setRecGrade(rec,3) },
          {text: '4 Stars', onPress: (text) => setRecGrade(rec,4) },
          {text: '5 Stars', onPress: (text) => setRecGrade(rec,5) },
          {text: 'Delete Rec', onPress: (text) => removeRec(rec._key)},
          {text: 'Cancel', onPress: (text) => console.log('Cancel')}
        ],
      );
  }

  onAddRecPress() {
    var Options = Array();
    Options.push({ text: 'Add New Recommendation', onPress: (textInput) => {this.props.actions.addRec(textInput)} })
    var recrs = this.props.state.recrs.map((recr) => {
      Options.push({text: `Recommended by ${recr.name}`, onPress: (textInput) => {this.props.actions.addRecWithRecr(textInput,recr)} });
    });
    Options.push({text: 'Cancel', onPress: (text) => console.log('action canelled') });
    AlertIOS.prompt('What did someone recommend?',null,Options);
  }

  renderRecList() {
    const Recs = this.props.state.displayRecs.map((rec) => {
      return <RecListItem navigator={this.props.navigator} key={rec._key} rec={rec} recrs={this.props.state.recrs} assignExistingRecrFunction={this.props.actions.assignExistingRecr}  createNewRecrFunction={this.props.actions.createNewRecr} onPress={this.onItemPress.bind(this,rec)} />
    });

    return Recs;
  }

  render() {
    console.log('-- Render Rec List');
    if(!this.props.state.recs)
      return(<View style={{marginTop:200}}><Text>Loading Recs</Text></View>);

    return(
      <View style={styles.listContainer}>
        <ScrollView style={styles.listview} >
          <FilterNav sortFunction={this.props.actions.sortBy} filterFunction={this.props.actions.filterBy} />
          {this.renderRecList()}
        </ScrollView>
        <ActionButton title="Add Recommedation" onPress={this.onAddRecPress.bind(this)} />
      </View>
    )

  }


}


// I do not understand any of this..
// this should probly change to limit scope
export default connect(state => ({
  state: state.chaz // this grabs information from the reducer.
}),
(dispatch) => ({
  actions: bindActionCreators(chazActions, dispatch)
})
)(RecList);
