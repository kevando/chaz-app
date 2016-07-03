import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableHighlight, ListView, AlertIOS, ActivityIndicatorIOS } from 'react-native';
import { bindActionCreators } from 'redux';
import * as chazActions from '../actions/chazActions';
import { connect } from 'react-redux';

import ActionButton from './ActionButton';
import FilterNav from './FilterNav';
import RecListItem from '../components/RecListItem';

import Loading from '../components/Loading';

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



  renderRecList() {
    const Recs = this.props.state.displayRecs.map((rec) => {
      return <RecListItem
        navigator={this.props.navigator}
        key={rec._key} rec={rec}
        recrs={this.props.state.recrs}
        assignExistingRecrFunction={this.props.actions.assignExistingRecr}
        createNewRecrFunction={this.props.actions.createNewRecr}
        onPress={this.onItemPress.bind(this,rec)} />
    });

    return Recs;
  }

  render() {
    console.log('-- Render Rec List');
    if(!this.props.state.displayRecs)
      return(<Loading text="Loading Display Recs" />);

    return(
      <View style={styles.listContainer}>
        <ScrollView style={styles.listview} >
          <FilterNav />
          {this.renderRecList()}
        </ScrollView>
        <ActionButton title="Add Recommedation" />
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
