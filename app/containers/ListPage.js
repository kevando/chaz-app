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
const ListItem = require('../components/ListItem');

const Firebase = require('firebase');

import * as styles from '../styles/styles.js';

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.userRef = new Firebase(`https://chaz1.firebaseio.com/users/${this.props.state.authData.uid}`);
    this.recsRef = this.userRef.child('recs');
    this.state = {
      loading:true,

    };


  }

  componentDidMount() {
    this.props.actions.listenForRecs();
  }

  onItemPress(rec) {

    // Commenting out while I test action creators returning functions

    AlertIOS.alert(
        'Grade this recommendation',
        null,
        [
          {text: '0 Stars', onPress: (text) => this.itemsRef.child(item._key).update({grade:0})},
          {text: '1 Stars', onPress: (text) => this.itemsRef.child(item._key).update({grade:1})},
          {text: '2 Stars', onPress: (text) => this.itemsRef.child(item._key).update({grade:2})},
          {text: '3 Stars', onPress: (text) => this.itemsRef.child(item._key).update({grade:3})},
          {text: '4 Stars', onPress: (text) => this.itemsRef.child(item._key).update({grade:4})},
          {text: '5 Stars', onPress: (text) => this.itemsRef.child(item._key).update({grade:5})},
          {text: 'Delete Rec', onPress: (text) => this.props.actions.removeRec(rec._key)},
          {text: 'Cancel', onPress: (text) => console.log('Cancel')}
        ],
      );
  }
  _renderItem(item) {


    return (
      <ListItem item={item} itemRef={this.recsRef.child(item._key)} onPress={onPress} />
    );
  }
  onAddRecPress() {

    AlertIOS.prompt(
      'What did someone recommend?',
      null,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel') },
        // {text: 'Add', onPress: (text) => {this.recsRef.push({ title: text, timestampCreated: Firebase.ServerValue.TIMESTAMP })}},
        { text: 'Add', onPress: (textInput) => {this.props.actions.addRec(textInput)} },

      ],
    );
  }
  renderRecList() {
    const Recs = this.props.state.recs.map((rec) => {
      return <ListItem key={rec._key} item={rec} itemRef={this.recsRef.child(rec._key)} onPress={this.onItemPress.bind(this,rec)} />
    });

    return Recs;
  }

  render() {
    if(!this.props.state.recs){
      return(<View style={{marginTop:200}}><Text>Loading Recs</Text></View>);
    }

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
)(ListPage);
