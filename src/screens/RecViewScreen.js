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
import * as Style from '../style/Style';
import RecGrade from '../components/rec/RecGrade';
import AddRecr from '../containers/rec/AddRecr';

// this is a traditional React component connected to the redux store
class RecViewScreen extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: Style.constants.colors[1],
  };

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }
  static navigatorButtons = {
    rightButtons: [{title: 'Delete',id: 'delete'}]
  }
  onNavigatorEvent(event) {
    switch (event.id) {
      case 'delete':
        this.onDeletePress()
        break;
      default:
        console.log('Unhandled event ' + event.id);
        break;
    }
  }
  onDeletePress(){
    AlertIOS.alert(
        'Are you sure you want to delete this?',
        null,
        [
          {text: 'Delete', onPress: (text) => this.removeRec()},
          {text: 'Cancel', onPress: (text) => console.log('Cancel')}
        ],
      );
  }
  removeRec() {
    this.props.dispatch(recActions.removeRec(this.props.currentRec._key));
    this.props.navigator.pop({
      animated: true
    });
  }

  componentDidMount() {
    this.props.dispatch(recActions.setCurrentRec(this.props.currentRec)); // maybe just do the key here
    // this.props.dispatch(recrActions.setCurrentRecr(this.props.currentRec.recr));
  }

  getDisplayGrade(rec) {
    if(rec.recr != null){
      if(rec.grade != null) {
        return(
          <TouchableOpacity onPress={ this.onAddGradePress.bind(this,rec) }>
            <RecGrade grade={rec.grade} />
          </TouchableOpacity>);
      } else {
        return(
          <TouchableOpacity onPress={ this.onAddGradePress.bind(this,rec) }>
            <Text style={styles.button}>Grade this</Text>
          </TouchableOpacity>
        );
      }
    }
  }
  getDisplayRecrRight(rec){
    if(rec.recr != null){
      return (
        <TouchableOpacity onPress={ this.onAddRecrPress.bind(this,rec) }>
          <Text style={{color:'red'}}>Change</Text>
        </TouchableOpacity>

      )
    }

  }
  displayComment(rec){
    if(rec.comment != null){
      return (<View>
          <Text style={{color:'#000',fontWeight:'700'}}>Comment: <Text style={{color:'#222',fontWeight:'300'}}>{rec.comment}</Text></Text>
          </View>
      )
    }

  }
  getDisplayRecrLeft(rec){
    if(rec.recr != null){
      return (
        <TouchableOpacity onPress={ this.onRecrPress.bind(this,rec) }>
          <Text>Recommended by: <Text style={styles.recrText}>{rec.recr.name}</Text></Text>
        </TouchableOpacity>
      )
    } else {
      return (
        <AddRecr rec={rec}/>
      )
    }

  }

  render() {
    const rec = this.props.rec.current;

    if(!rec)
      return(<View><Text>Something went wrong and no current rec was set</Text></View>);

    return (
      <View style={{flex: 1, paddingTop: 20,backgroundColor:'#eee'}}>
        <View style={styles.row}>
          <View style={styles.left}>
            <Text style={{fontSize:20}}>{rec.title}</Text>
          </View>
          <View style={styles.right}>
            <TouchableOpacity onPress={ this.onTitlePress.bind(this,rec) }>
              <Text style={{color:'red'}}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.left}>
            {this.getDisplayGrade(rec)}
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.left}>
            {this.getDisplayRecrLeft(rec)}
          </View>
          <View style={styles.right}>
            {this.getDisplayRecrRight(rec)}
          </View>
        </View>
        <View style={styles.row}>
            {this.displayComment(rec)}
        </View>


      </View>
    );
  }


  onAddRecrPress() {
    var options = Array();
    options.push({text: 'Add New',  onPress: (recrName) => { this.addRecr(recrName) }    });
    options.push({text: 'Cancel', onPress: (text) => console.log('action canelled') });
    AlertIOS.prompt('Who recommended this?', null, options);
  }

  // not sure why i need to add this now?
  addRecr(recrName) {
    // create new recr if new
    // update current with updated rec info
    this.props.dispatch(recrActions.createRecr(recrName));
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
          {text: 'Remove Grade', onPress: (text) => this.props.dispatch(recActions.setGrade(rec,null)) },
          // {text: 'Delete Rec', onPress: (text) => removeRec(rec._key)},
          {text: 'Cancel', onPress: (text) => console.log('Cancel')}
        ],
      );
  }

}

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    borderBottomWidth:1,
    borderBottomColor: '#ddd',

    flexDirection: 'row',
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10
  },
  right: {
    flex:1,
    justifyContent: 'center', // vertical middle
    flexDirection: 'row'
  },
  left: {
    flex:3,

  },
  recrText: {
    color: Style.constants.colors[2]
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
