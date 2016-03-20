import React, { Component, StyleSheet, View, ScrollView, Text, TouchableHighlight, ListView, AlertIOS, ActivityIndicatorIOS } from 'react-native';

// import DufineListItem from '../components/DufineListItem'; //
// import DufineView from './DufineView'; //
// import TrashCan from './TrashCan'
// import Welcome from './Welcome';
// import Empty from '../components/Empty';

// From the tweet app, this was a component, changing this to a container now so it has access to redux
// at least i think thats how it works. here is the redux connection code
import { bindActionCreators } from 'redux';
import * as chazActions from '../actions/chazActions'; // not sure that i need this
import { connect } from 'react-redux';

const ActionButton = require('../components/ActionButton');
const FilterNav = require('../components/FilterNav');
const RecListItem = require('../components/RecListItem');

// const Firebase = require('firebase');

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
    const Recs = this.props.state.recs.map((rec) => {
      return <RecListItem key={rec._key} rec={rec} recrs={this.props.state.recrs} assignExistingRecrFunction={this.props.actions.assignExistingRecr}  createNewRecrFunction={this.props.actions.createNewRecr} onPress={this.onItemPress.bind(this,rec)} />
    });

    return Recs;
  }

  render() {
    if(!this.props.state.recs)
      return(<View style={{marginTop:200}}><Text>Loading Recs</Text></View>);

    return(
      <View style={styles.listContainer}>
        <ScrollView style={styles.listview} >
          <FilterNav sortFunction={this.props.actions.sortBy} />
          {this.renderRecList()}
        </ScrollView>
        <ActionButton title="Add Recommedation" onPress={this.onAddRecPress.bind(this)} />
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
)(RecList);
