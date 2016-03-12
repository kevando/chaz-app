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
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.setDisplayList = this.setDisplayList.bind(this);

  }
  // Called when the component has first been rendered
  // Probably a good place for tracking code
  componentDidMount() {
    this.listenForItems(this.recsRef);

    // this.setState({
    //   dataSource: this.state.dataSource.cloneWithRows([{ title: 'Pizza' }])
    // })
  }
  setDisplayList(recs) {
    this.setState({
      loading:false,
      dataSource: this.state.dataSource.cloneWithRows(recs),
      recs: recs
    });

  }
  onItemPress() {
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
          {text: 'Delete Rec', onPress: (text) => this.recsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancel')}
        ],
      );
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
          {text: 'Delete Rec', onPress: (text) => this.recsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancel')}
        ],
      );
    };

    return (
      <ListItem item={item} itemRef={this.recsRef.child(item._key)} onPress={onPress} />
    );
  }
  _addItem() {
    AlertIOS.prompt(
      'What did someone recommend?',
      null,
      [
        {text: 'Cancel', onPress: (text) => console.log('Cancel')},
        {text: 'Add', onPress: (text) => {this.recsRef.push({ title: text, timestampCreated: Firebase.ServerValue.TIMESTAMP })}},

      ],
    );
  }
  listenForItems(recsRef) {
    // console.log('listen for items?');
    recsRef.on('value', (snap) => {

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
      this.setDisplayList(items);
    });
  }


  render() {
    if(!this.state.loading){ // this code errors if state data not loaded im drunk

      console.log('dude',this.state)
      const Recs = this.state.recs.map((rec) => {
        // test var dufineData = state.dufines[0];
        // adding key to stop the react-native child array error. probly dont want to use word cause it could be dup
        // return <DufineListItem {...dufineData} onPress={this.goToRoute} goToDufine={this.goToDufine} key={dufineData.word }/>;
        // <ListItem item={item} itemRef={this.recsRef.child(item._key)} onPress={onPress} />
        // console.log(rec)
        return <ListItem item={rec} itemRef={this.recsRef.child(rec._key)} onPress={this.onItemPress} />
      });
      return(
        <View style={styles.listContainer}>
          <View style={{backgroundColor:'orange',marginTop:80}}>
            <Text>Sort By:</Text>
            <View style={{flex:1,flexDirection:'row'}}>
            <TouchableHighlight >
                <Text>Newest</Text>
              </TouchableHighlight>
              <TouchableHighlight >
                  <Text>Oldest</Text>
                </TouchableHighlight>
            </View>
          </View>

          <ScrollView style={styles.listview} >
              {Recs}
            </ScrollView>

            <ActionButton title="Add Recommedation" onPress={this._addItem.bind(this)} />
        </View>
      );
    } else {
      return(
        <ActivityIndicatorIOS
        animating={this.state.loading}
        style={[styles.centering, {height: 80}]}
        size="large"
      />
    );
    }
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
