import React, { Component, StyleSheet, View, Text, TouchableHighlight, ListView, AlertIOS, ActivityIndicatorIOS } from 'react-native';

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
      loading:true,
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
        'Grade this recommendation',
        null,
        [
          {text: '0 Stars', onPress: (text) => this.itemsRef.child(item._key).update({grade:0})},
          {text: '1 Stars', onPress: (text) => this.itemsRef.child(item._key).update({grade:1})},
          {text: '2 Stars', onPress: (text) => this.itemsRef.child(item._key).update({grade:2})},
          {text: '3 Stars', onPress: (text) => this.itemsRef.child(item._key).update({grade:3})},
          {text: '4 Stars', onPress: (text) => this.itemsRef.child(item._key).update({grade:4})},
          {text: '5 Stars', onPress: (text) => this.itemsRef.child(item._key).update({grade:5})},
          {text: 'Delete Rec', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancel')}
        ],
      );
    };

    return (
      <ListItem item={item} itemRef={this.itemsRef.child(item._key)} onPress={onPress} />
    );
  }
  _addItem() {
    AlertIOS.prompt(
      'What did someone recommend?',
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
          _key: child.key(),
          recr: child.val().recr, // I feel like I shouldnt have to do this
          grade: child.val().grade, // I feel like I shouldnt have to do this
        });
      });
      console.log('items',items);
      this.setState({
        loading:false,
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
