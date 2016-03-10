import React, { Component, StyleSheet, View, Text, TouchableHighlight } from 'react-native';

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

import * as styles from '../styles/styles.js';

class ListPage extends Component {
  constructor(props) {
    super(props);

    // this.goToDufine = this.goToDufine.bind(this);
    this.attemptLogout = this.attemptLogout.bind(this);
  }

  attemptLogout() {
    // fireRef.unauth(); // this does nothing, but why? i must have coded this weird
    this.props.actions.setAuthData({});
  }

  render() {
    

    return(
      <View style={styles.containerTmp}>
        <Text>ChazApp You are logged in! Hello {this.props.state.authData.uid}</Text>
      <TouchableHighlight onPress={this.attemptLogout} >
        <Text>attemptLogout</Text>
      </TouchableHighlight>
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
