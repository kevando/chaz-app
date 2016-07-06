import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  AlertIOS
} from 'react-native';
import { connect } from 'react-redux';
import * as recrActions from '../reducers/recr/actions';
import * as recActions from '../reducers/rec/actions';
import ListItem from '../components/rec/ListItem';

let navBarVisiable = true;

// this is a traditional React component connected to the redux store
class RecrViewScreen extends Component {
  static navigatorStyle = {
    statusBarColor: '#303F9F',
    toolBarColor: '#3F51B5',
    navigationBarColor: '#303F9F',
    tabSelectedTextColor: '#FFA000',
    tabNormalTextColor: '#FFC107',
    tabIndicatorColor: '#FFA000'
  };


  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

  }
  componentDidMount() {
    this.props.dispatch(recrActions.setCurrentRecrByKey(this.props.recrKey));
  }



  render() {
    const recr = this.props.recr.current;

    if(!recr)
      return(<View><Text>Something went wrong and no current rec was set</Text></View>);


    return (
      <View style={{flex: 1, padding: 20}}>

        <Text style={styles.text}>
          <Text style={{fontWeight: '500',marginBottom:30}}>{recr.name}</Text>
        </Text>
        <Text style={styles.text}>
          Total Recs: <Text style={{fontWeight: '500'}}>4</Text>
        </Text>
        <Text style={styles.text}>
          Score: <Text style={{fontWeight: '500'}}>48</Text>
        </Text>


        {this.renderRecList(this.props.navigator)}

      </View>
    );
  }

  renderRecList(navigator) { // not sure if passing nav is a good idea but it works
    var recs = Array();

    // this.props.recr.current.recs.forEach(function(rec) {
    for (var key in this.props.recr.current.recs) {

      recs.push(<ListItem key={this.props.recr.current.recs[key]._key} rec={this.props.recr.current.recs[key]} navigator={navigator} />);
      // recs.push(<Text>{this.props.recr.recs[key].title}</Text>);
    };
    return recs;
  }

  onAddRecrPress() {
    var options = Array();
    options.push({text: 'Add New',  onPress: (recrName) => { this.addRecr(recrName) }    });
    // var recrs = this.props.recrs.map((recr) => {
    //   options.push({text: recr.name, onPress: () => {this.props.assignExistingRecrFunction(recr,this.props.rec)} });
    // });
    options.push({text: 'Cancel', onPress: (text) => console.log('action canelled') });

    AlertIOS.prompt('Who recommended this?', null, options);
  }
  addRecr(recrName) {
    // create new recr if new
    // update current with updated rec info
    this.props.dispatch(recrActions.createRecr(recrName));
  }

  onPushPress() {
    this.props.navigator.push({
      title: "More",
      screen: "example.PushedScreen",
      passProps: {
        str: 'This is a prop passed in \'navigator.push()\'!',
        obj: {
          str: 'This is a prop passed in an object!',
          arr: [
            {
              str: 'This is a prop in an object in an array in an object!'
            }
          ]
        },
        num: 1234
      }
    });
  }

  onShowModalPress() {
    this.props.navigator.showModal({
      title: "Modal Screen",
      screen: "example.PushedScreen",
      passProps: {
        str: 'This is a prop passed in \'navigator.showModal()\'!',
        obj: {
          str: 'This is a prop passed in an object!',
          arr: [
            {
              str: 'This is a prop in an object in an array in an object!'
            }
          ]
        },
        num: 1234
      }
    });
  }

  onToggleNavBarPress() {
    navBarVisiable = !navBarVisiable;
    this.props.navigator.toggleNavBar({
      to: navBarVisiable ? 'shown' : 'hidden',
      animated: true
    });
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10
  },
  button: {
    textAlign: 'left',
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
    // rec: state.rec,
    recr: state.recr
  };
}

export default connect(mapStateToProps)(RecrViewScreen);
