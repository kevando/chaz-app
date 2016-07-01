import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableHighlight, ListView, AlertIOS, ActivityIndicatorIOS } from 'react-native';
import { bindActionCreators } from 'redux';
import * as chazActions from '../actions/chazActions'; // not sure that i need this
import { connect } from 'react-redux';

// const ActionButton = require('../components/ActionButton');
// const FilterNav = require('../components/FilterNav');
const RecrListItem = require('../components/RecrListItem');

import * as styles from '../styles/styles.js';

class RecrList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:true,
    };
  }

  renderRecrList() {
    console.log(this.props.state)
    const Recrs = this.props.state.recrs.map((recr) => {
      return <RecrListItem key={recr._key} recr={recr}  />
    });

    return Recrs;
  }


  render() {
    if(!this.props.state.recs){
      return(<View style={{marginTop:200}}><Text>Loading friends</Text></View>);
    }

    return(
      <View style={styles.listContainer}>
        <ScrollView style={styles.listview} >

          {this.renderRecrList()}
        </ScrollView>
      </View>
    )

  }
}



// export default ListPage;
// I do not understand any of this..
export default connect(state => ({
  state: state.chaz // this grabs information from the reducer.
}),
(dispatch) => ({
  actions: bindActionCreators(chazActions, dispatch)
})
)(RecrList);
