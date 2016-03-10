import React, { Component, StyleSheet, View, Text, TouchableHighlight, ListView, AlertIOS } from 'react-native';

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
const ListItem = require('../components/ListItem');

const Firebase = require('firebase');

import * as styles from '../styles/styles.js';

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.itemsRef = new Firebase(`https://chaz1.firebaseio.com/itemsByUser/${this.props.state.authData.uid}`);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };

  }
  // Called when the component has first been rendered
  // Probably a good place for tracking code
  componentDidMount() {
    this.listenForItems(this.itemsRef);

    // this.setState({
    //   dataSource: this.state.dataSource.cloneWithRows([{ title: 'Pizza' }])
    // })
  }
  _renderItem(item) {
    const onPress = () => {
    AlertIOS.alert(
        'Delete',
        null,
        [
          {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancel')}
        ],
      );
    };

    return (
      <ListItem item={item} onPress={onPress} />
    );
  }
  _addItem() {
    AlertIOS.prompt(
      'What did someone suggest?',
      null,
      [
        {text: 'Cancel', onPress: (text) => console.log('Cancel')},
        {text: 'Add', onPress: (text) => {this.itemsRef.push({ title: text })}},

      ],
    );
  }
  listenForItems(itemsRef) {
    // console.log('listen for items?');
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key()
        });
      });
      console.log('items',items);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    });
  }


  render() {


    return(
      <View style={styles.container}>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listview} />

          <ActionButton title="Add Recommedation" onPress={this._addItem.bind(this)} />
      </View>
    );
    // return (
    //   <ScrollView style={styles.container}>
    //     {Dufines}
    //   </ScrollView>
    // );
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
