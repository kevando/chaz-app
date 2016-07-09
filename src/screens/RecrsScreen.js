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
import * as recrActions from '../reducers/recr/actions';
import ListItem from '../components/recr/ListItem';
import Style from '../style/Style';
let navBarVisiable = true;

// this is a traditional React component connected to the redux store
class RecrsScreen extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: Style.constants.colors[2],
    navBarButtonColor: '#fff',
  };



  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  componentDidMount() {
    this.props.dispatch(recrActions.listenForRecrs());
    // this.props.dispatch(recrActions.listenForNewRecrs()); // i dont really like multiple listeners like this cant do this i guess wtf
  }

  render() {

    if(!this.props.recr.all)
      return (<View><Text>No visible recrs yet</Text></View>)

    return (
      <View style={{flex: 1, padding: 0}}>
        <ScrollView>
          {this.renderRecrList(this.props.navigator)}
          </ScrollView>
      </View>
    );
  }


  renderRecrList(navigator) { // not sure if passing nav is a good idea but it works
    var recrs = Array();
    this.props.recr.all.forEach(function(recr) {
      recrs.push(<ListItem key={recr._key} recr={recr} navigator={navigator} />);
    });
    return recrs;
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
    recr: state.recr,
    // counter: state.counter // this is like the entire folder level shit
  };
}

export default connect(mapStateToProps)(RecrsScreen);
