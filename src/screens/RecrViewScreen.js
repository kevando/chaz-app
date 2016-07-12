import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActionSheetIOS,
  StyleSheet,
  AlertIOS
} from 'react-native';
import { connect } from 'react-redux';
import * as recrActions from '../reducers/recr/actions';
import * as recActions from '../reducers/rec/actions';
import ListItem from '../components/rec/ListItem';
import Style from '../style/Style';
let navBarVisiable = true;

// this is a traditional React component connected to the redux store
class RecrViewScreen extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: Style.constants.colors[2],
    navBarTextColor: Style.constants.colors[1],
    navBarButtonColor: '#fff',
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

        <Text style={styles.nameText}>
          <Text style={{fontWeight: '500',marginBottom:30}}>{recr.name}</Text>
        </Text>
        <Text style={styles.text}>
          Total Recs: <Text style={{fontWeight: '500'}}>{this.getTotalRecs()}</Text>
        </Text>
        <Text style={styles.text}>
          Score: <Text style={{fontWeight: '500'}}>{this.getScore()}</Text>
        </Text>

        <ScrollView style={{borderTopWidth:2,borderTopColor:'#ccc',marginTop:20}}>
          {this.renderRecList(this.props.navigator)}
        </ScrollView>


      </View>
    );
  }
  getTotalRecs() {
    var totalRecs = 0;
    for (var key in this.props.recr.current.recs) {
      totalRecs++;
    };
    return totalRecs;
  }
  getScore() {
    console.log('recr',this.props.recr.current)
    var score = this.props.recr.current.score;

    return score;
  }

  renderRecList(navigator) { // not sure if passing nav is a good idea but it works
    var recs = Array();
    for (var key in this.props.recr.current.recs) {
      recs.push(<ListItem key={this.props.recr.current.recs[key]._key} rec={this.props.recr.current.recs[key]} navigator={navigator} />);
    };
    if(recs.length){
      return recs;
    } else {
      return(
        <TouchableOpacity onPress={ this.onDeleteRecrPress.bind(this) }>
          <Text style={{color:'red'}}>Delete this friend</Text>
        </TouchableOpacity>
      )
    }
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
  onDeleteRecrPress() {
    var recr = this.props.recr.current;
    var props = this.props;
    var navigator = this.props.navigator

    ActionSheetIOS.showActionSheetWithOptions({
      title: 'Are you sure?',
      options: ['Delete '+recr.name, 'Cancel'],
      cancelButtonIndex: 1,
      destructiveButtonIndex: 0,
    },
    (buttonIndex) => {
      if(buttonIndex == 0){
        props.dispatch(recrActions.removeRecr(recr._key));
        navigator.pop({
          animated: true
        });
      }
    });
  }

}

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
    fontSize: 14,
    marginBottom: 5,
    marginTop:5
  },
  nameText: {
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
