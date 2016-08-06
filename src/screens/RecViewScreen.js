import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  AlertIOS,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';
import * as recrActions from '../reducers/recr/actions';
import * as recActions from '../reducers/rec/actions';
import * as Style from '../style/Style';
import RecGrade from '../components/rec/RecGrade';
import AddRecr from '../containers/rec/AddRecr';
import RecType from '../components/rec/RecType';

// this is a traditional React component connected to the redux store
class RecViewScreen extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: Style.constants.colors[1],
  };

  constructor(props) {
    super(props);
    // if you want to listen on navigator events, set this up
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    this.state = {rec: {} }
  }
  componentWillMount() { // fires on rec view load
    this.setRecFromRecList(this.props.rec.getIn(['all']));
  }
  componentWillReceiveProps(nextProps) { // this fires when redux updates
    this.setRecFromRecList(nextProps.rec.getIn(['all']));
  }

  setRecFromRecList(recList) {
    const recKey = this.props.recKey;
    var Rec = recList.find(function(rec) { return rec.get('_key') === recKey; });
    if(Rec)
      this.setState({rec:  Rec.toJS()});
  }

  render() {

    // console.log('review RENDER',this.state.rec);

    return (
      <View style={{flex: 1, paddingTop: 0,backgroundColor:'#eee'}}>
        <View style={{backgroundColor:'#fff',padding:10}}>
          <View style={styles.row}>
            <View style={styles.left}>
                  <RecType type={this.state.rec.type} size={40} />
            </View>
            <View style={styles.right}>
              <TouchableOpacity onPress={this.onTitlePress.bind(this)}>
                  <Text style={{fontSize:20}}>{this.state.rec.title}</Text>
                </TouchableOpacity>
            </View>
          </View>
          <View style={{padding:15}}>
          {( this.state.rec.note
            ? <Text><Text style={{fontWeight:'600',fontSize:15}}>Note:</Text>{this.state.rec.note}</Text>
            : <TextInput
              style={{fontSize:15,height: 40,paddingLeft:10}}
              onChangeText={(recNote) => this.setState({recNote})}
              onSubmitEditing={(recNote) => this.props.dispatch(recActions.updateRecTitle(this.state.rec,recNote))}
              value={this.state.recNote}
              returnKeyType={'done'}
              placeholder="Add a note..."
              ref="NoteInput"

            />
          )}



          </View>
        </View>
      </View>
    );
  }
  static navigatorButtons = {
    rightButtons: [{title: 'Delete',id: 'delete'}]
  }
  onNavigatorEvent(event) {
    switch (event.id) {
      case 'delete':
        this.onDeletePress()
        break;
      case 'pop': // This is only for when Rec Viewed after inital add
        this.props.navigator.dismissModal({ animationType: 'slide-down' });
        this.props.navigator.popToRoot({ animated: true });
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
    this.props.dispatch(recActions.removeRec(this.props.recKey));
    this.props.navigator.pop({
      animated: true
    });
  }


  // getDisplayGrade(rec) {
  //   if(rec.recr != null){
  //     if(rec.grade != null) {
  //       return(
  //         <TouchableOpacity onPress={ this.onAddGradePress.bind(this,rec) }>
  //           <RecGrade grade={rec.grade} />
  //         </TouchableOpacity>);
  //     } else {
  //       return(
  //         <TouchableOpacity onPress={ this.onAddGradePress.bind(this,rec) }>
  //           <Text style={styles.button}>Grade this</Text>
  //         </TouchableOpacity>
  //       );
  //     }
  //   }
  // }
  // getDisplayRecrRight(rec){
  //   if(rec.recr != null){
  //     return (
  //       <TouchableOpacity onPress={ this.onAddRecrPress.bind(this,rec) }>
  //         <Text style={{color:'red'}}>Change</Text>
  //       </TouchableOpacity>
  //
  //     )
  //   }
  //
  // }
  displayComment(rec){
    if(rec.comment != null){
      return (<View>
          <Text style={{color:'#000',fontWeight:'700'}}>Comment: <Text style={{color:'#222',fontWeight:'300'}}>{rec.comment}</Text></Text>
          </View>
      )
    }

  }
  // getDisplayRecrLeft(rec){
  //   // <TouchableOpacity onPress={ this.onRecrPress.bind(this,rec) }> removing this for now
  //   if(rec.recr != null){
  //     return (
  //       <TouchableOpacity>
  //         <Text>Recommended by: <Text style={styles.recrText}>{rec.recr.name}</Text></Text>
  //       </TouchableOpacity>
  //     )
  //   } else {
  //     return (
  //       <AddRecr rec={rec}/>
  //     )
  //   }
  //
  // }




  // onAddRecrPress() {
  //   var options = Array();
  //   options.push({text: 'Add New',  onPress: (recrName) => { this.addRecr(rec,recrName) }    });
  //   options.push({text: 'Cancel', onPress: (text) => console.log('action canelled') });
  //   AlertIOS.prompt('Who recommended this?', null, options);
  // }

  // not sure why i need to add this now?
  // assignRecr(rec,recrName) {
  //   // create new recr if new
  //   // update current with updated rec info
  //   this.props.dispatch(recrActions.assignRecr(rec,recrName));
  // }


  onTitlePress() {
    var options = Array();
    options.push({text: 'Submit',  onPress: (title) => { this.props.dispatch(recActions.updateRecTitle(this.state.rec,title)); }    });
    options.push({text: 'Cancel', onPress: (text) => console.log('action canelled') });
    AlertIOS.prompt('Change Title', null, options,'plain-text',this.state.rec.title);
  }

  // onRecrPress() {
  //   this.props.navigator.push({
  //     title: "Recr",
  //     screen: "chaz.RecrViewScreen",
  //     passProps: {recrKey:this.props.rec.current.recr._key }
  //   });
  // }
  // onAddGradePress(rec) {
  //   // const { setRecGrade, removeRec } = this.props.actions;
  //   AlertIOS.alert(
  //       'Grade this recommendation',
  //       null,
  //       [
  //         {text: '1 Stars', onPress: (text) => this.props.dispatch(recActions.setGrade(rec,1)) },
  //         {text: '2 Stars', onPress: (text) => this.props.dispatch(recActions.setGrade(rec,2)) },
  //         {text: '3 Stars', onPress: (text) => this.props.dispatch(recActions.setGrade(rec,3)) },
  //         {text: '4 Stars', onPress: (text) => this.props.dispatch(recActions.setGrade(rec,4)) },
  //         {text: '5 Stars', onPress: (text) => this.props.dispatch(recActions.setGrade(rec,5)) },
  //         {text: 'Remove Grade', onPress: (text) => this.props.dispatch(recActions.setGrade(rec,null)) },
  //         // {text: 'Delete Rec', onPress: (text) => removeRec(rec._key)},
  //         {text: 'Cancel', onPress: (text) => console.log('Cancel')}
  //       ],
  //     );
  // }

}

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    // borderBottomWidth:1,
    // borderBottomColor: '#ddd',

    flexDirection: 'row',
    paddingTop:0,
    paddingBottom:0,
    paddingLeft:0,
    paddingRight:0
  },
  right: {
    flex:5,
    justifyContent: 'center', // vertical middle
    flexDirection: 'column'
  },
  left: {
    flex:1,

  },
  recrText: {
    color: Style.constants.colors[2]
  }
});

// which props do we want to inject, given the global state?
// kevin is not super sure about this
function mapStateToProps(state) {
  return {
    rec: state.rec, // not sure I want to do this
    recr: state.recr
  };
}

export default connect(mapStateToProps)(RecViewScreen);
