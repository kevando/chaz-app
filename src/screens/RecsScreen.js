import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
// import * as counterActions from '../reducers/counter/actions';
import * as recActions from '../reducers/rec/actions';
import ListItem from '../components/rec/ListItem';

let navBarVisiable = true;

// this is a traditional React component connected to the redux store
class RecsScreen extends Component {
  static navigatorStyle = {
    statusBarColor: '#303F9F',
    toolBarColor: '#3F51B5',
    navigationBarColor: '#303F9F',
    tabSelectedTextColor: '#FFA000',
    tabNormalTextColor: '#FFC107',
    tabIndicatorColor: '#FFA000'
  };

  static navigatorButtons = {
    rightButtons: [
      {
        icon: require('../../img/navicon_add.png'),
        title: 'Add',
        id: 'add'
      }
    ]
  };

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent(event) {
    switch (event.id) {
      case 'add':
        this.onShowModalPress()
        break;
      default:
        console.log('Unhandled event ' + event.id);
        break;
    }
  }
  componentDidMount() {
    this.props.dispatch(recActions.listenForRecs());
  }

  render() {

    if(!this.props.rec.all)
      return (<View><Text>No visible recs yet</Text></View>)

    return (
      <View style={{flex: 1, padding: 20}}>
      <ScrollView>
        {this.renderRecList(this.props.navigator)}
        </ScrollView>
      </View>
    );
  }


  renderRecList(navigator) { // not sure if passing nav is a good idea but it works
    var recs = Array();
    this.props.rec.all.forEach(function(rec) {

      recs.push(<ListItem key={rec._key} rec={rec} navigator={navigator} />);
    });
    return recs;
  }

  onShowModalPress() {
    this.props.navigator.showModal({
      title: "Add NEW rec",
      screen: "chaz.RecAddScreen",
      passProps: { }
    });
  }

}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10
  },
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10,
    color: 'blue'
  }
});

// which props do we want to inject, given the global state?
// kevin is not super sure about this
function mapStateToProps(state) {
  return {
    rec: state.rec,
    // counter: state.counter // this is like the entire folder level shit
  };
}

export default connect(mapStateToProps)(RecsScreen);
