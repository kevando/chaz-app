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


let navBarVisiable = true;

// this is a traditional React component connected to the redux store
class RecViewScreen extends Component {
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
        title: 'Edit',
        id: 'edit'
      },
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
  componentDidMount() {
    this.props.dispatch(recActions.setCurrentRec(this.props.currentRec)); // maybe just do the key here
  }

  onNavigatorEvent(event) {
    // switch (event.id) {
    //   case 'edit':
    //     Alert.alert('NavBar', 'Edit button pressed');
    //     break;
    //
    //   case 'add':
    //     Alert.alert('NavBar', 'Add button pressed');
    //     break;
    //
    //   default:
    //     console.log('Unhandled event ' + event.id);
    //     break;
    // }
  }

  render() {
    const rec = this.props.rec.current;

    if(!rec)
      return(<View><Text>Something went wrong and no current rec was set</Text></View>);

    return (
      <View style={{flex: 1, padding: 20}}>

      <TouchableOpacity onPress={ this.onTitlePress.bind(this,rec) }>
        <Text>Title: <Text style={styles.button}>{rec.title}</Text></Text>
      </TouchableOpacity>

        {( rec.recr != null

          ?
          <View>
          <TouchableOpacity onPress={ this.onRecrPress.bind(this,rec) }>
            <Text style={styles.button}>{rec.recr.name}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={ this.onAddRecrPress.bind(this,rec) }>
            <Text style={styles.button}>Change Recr</Text>
          </TouchableOpacity>
          </View>


          : <TouchableOpacity onPress={ this.onAddRecrPress.bind(this,rec) }>
            <Text style={styles.button}>who Recommended?</Text>
          </TouchableOpacity>
        )}










      </View>
    );
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

  onTitlePress() {
    var options = Array();
    options.push({text: 'Submit',  onPress: (title) => { this.props.dispatch(recActions.updateTitle(title)); }    });
    options.push({text: 'Cancel', onPress: (text) => console.log('action canelled') });

    AlertIOS.prompt('Change Title', null, options);
  }

  onRecrPress() {
    this.props.navigator.push({
      title: "Recr",
      screen: "chaz.RecrViewScreen",
      passProps: {recr:this.props.rec.current.recr }
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
    rec: state.rec,
    recr: state.recr
  };
}

export default connect(mapStateToProps)(RecViewScreen);
