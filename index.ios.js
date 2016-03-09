'use strict';
// import React, {
//   AppRegistry,
//   Component,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

const React = require('react-native');

const Firebase = require('firebase');

const styles = require('./styles.js');

const StatusBar = require('./components/StatusBar');
const ActionButton = require('./components/ActionButton');
const ListItem = require('./components/ListItem');
const { AppRegistry, Component, StyleSheet, Text, View, ListView, AlertIOS } = React;


const FirebaseUrl = 'https://chaz1.firebaseio.com/';

class chaz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('items');
  }
  getRef() {
   return new Firebase(FirebaseUrl);
  }
  // Called when the component has first been rendered
  // Probably a good place for tracking code
  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }
  _renderItem(item) {
    const onPress = () => {
    AlertIOS.alert(
        'Complete',
        null,
        [
          {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancel')}
        ],
        'default'
      );
    };

    return (
      <ListItem item={item} onPress={onPress} />
    );
  }
  _addItem() {
    AlertIOS.alert(
      'Add New Item',
      null,
      [
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ title: text })
          }
        },
      ],
      'plain-text'
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
    var ref = this.getRef();
    ref.authWithPassword({
  email    : "test1@kevinhabich.com",
  password : "1"
}, function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
});
    return (
      <View style={styles.container}>

        <StatusBar title="Grocery List" />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          style={styles.listview} />

          <ActionButton title="Add" onPress={this._addItem.bind(this)} />
      </View>
    );
  }
}


AppRegistry.registerComponent('chaz', () => chaz);
