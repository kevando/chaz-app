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


  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));

  }
  componentDidMount() {
    this.props.dispatch(recActions.setCurrentRec(this.props.currentRec)); // maybe just do the key here
    // this.props.dispatch(recrActions.setCurrentRecr(this.props.currentRec.recr));
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
            <Text>Friend: <Text style={styles.button}>{rec.recr.name}</Text></Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={ this.onAddRecrPress.bind(this,rec) }>
            <Text style={styles.button}>Change Recr</Text>
          </TouchableOpacity>

          {( rec.grade != null

            ?
            <View>

            <TouchableOpacity onPress={ this.onAddGradePress.bind(this,rec) }>
              <Text style={styles.button}>Grade: {rec.grade}</Text>
              </TouchableOpacity>

            </View>


            : <TouchableOpacity onPress={ this.onAddGradePress.bind(this,rec) }>
              <Text style={styles.button}>Grade this</Text>
            </TouchableOpacity>
          )}


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
    options.push({text: 'Cancel', onPress: (text) => console.log('action canelled') });
    AlertIOS.prompt('Who recommended this?', null, options);
  }


  onTitlePress() {
    var options = Array();
    options.push({text: 'Submit',  onPress: (title) => { this.props.dispatch(recActions.updateTitle(title)); }    });
    options.push({text: 'Cancel', onPress: (text) => console.log('action canelled') });
    AlertIOS.prompt('Change Title', null, options,'plain-text',this.props.rec.current.title);
  }

  onRecrPress() {
    this.props.navigator.push({
      title: "Recr",
      screen: "chaz.RecrViewScreen",
      passProps: {recrKey:this.props.rec.current.recr._key }
    });
  }
  onAddGradePress(rec) {
    // const { setRecGrade, removeRec } = this.props.actions;
    AlertIOS.alert(
        'Grade this recommendation',
        null,
        [
          {text: '1 Stars', onPress: (text) => this.props.dispatch(recActions.setGrade(rec,1)) },
          {text: '2 Stars', onPress: (text) => this.props.dispatch(recActions.setGrade(rec,2)) },
          {text: '3 Stars', onPress: (text) => this.props.dispatch(recActions.setGrade(rec,3)) },
          {text: '4 Stars', onPress: (text) => this.props.dispatch(recActions.setGrade(rec,4)) },
          {text: '5 Stars', onPress: (text) => this.props.dispatch(recActions.setGrade(rec,5)) },
          // {text: 'Delete Rec', onPress: (text) => removeRec(rec._key)},
          {text: 'Cancel', onPress: (text) => console.log('Cancel')}
        ],
      );
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
