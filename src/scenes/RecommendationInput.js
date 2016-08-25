import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  // ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  // Dimensions,
  // DeviceEventEmitter
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Actions} from "react-native-router-flux";
import { connect } from 'react-redux';
import * as recActions from '../reducers/rec/actions';
import * as GlobalStyle from '../style/Global';

class RecommendationAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: this.props.rec.title,
      note: this.props.rec.note,
    }
  }

  componentWillReceiveProps(nextProps) {
    // This gets invoked after ADD_REC or UPDATE_REC updates the state tree
    // Now get user back to recView with their data

    // if editing
    if(this.props.rec.id){
      Actions.pop({refresh: {rec:this.props.rec}}); // previous scene is RecView
    }
    // if new
    else {
      var rec = nextProps.recs.last();
      Actions.recommendationFromAdd({rec:rec.toJS()}); // fwd to RecView
    }
  }

  componentDidMount() {
    // Set keyboard active
    this.refs.TitleInput.focus(true);
    // TODO, figure out if user is editing note
  }

  render() {

    return (
      <View style={{flex:1}}>

        {this.renderTitleInput()}

        <View style={{borderTopColor:'#ccc',borderTopWidth:1}}>
          {this.renderNoteInput()}
        </View>

        {( this.state.title == ''
        ?
        null
        :
        <View style={styles.buttonContainer} >
          <TouchableOpacity style={styles.saveButton} onPress={ this.onSaveRecPress.bind(this) }>
            <Text style={styles.saveText}>Save Recommendation</Text>
          </TouchableOpacity>
        </View>

        )}

        <KeyboardSpacer/>
      </View>
    );
  }

  renderTitleInput() {
    return (
      <TextInput
        style={{height: 40, paddingLeft:10}}
        onChangeText={(title) => this.setState({title})}
        value={this.state.title}
        placeholder={"Add a new recommendation"}
        ref="TitleInput"
        enablesReturnKeyAutomatically={true}
        returnKeyType={'done'}
        onSubmitEditing={this.onSaveRecPress.bind(this)}
      />
    )
  }
  renderNoteInput() {
    return (
      <TextInput
        style={{fontSize:15,height: 40,paddingLeft:10,height:200}}
        onChangeText={(note) => this.setState({note})}
        value={this.state.note}
        placeholder="Write a note about this moment... (optional)"
        ref="NoteInput"
        multiline={true}
        onSubmitEditing={this.onSaveRecPress.bind(this)}
      />
    )
  }

  onSaveRecPress() {
    var {title,note} = this.state;
    // if editing
    if(this.props.rec.id){
      var newRec = this.props.rec;
      newRec.title = title;
      newRec.note = note;
      this.props.dispatch(recActions.updateRec(newRec));
    }
    // if new
    else {
        this.props.dispatch(recActions.addRec(title,note));
    }
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex:1,
    flexDirection:'column',
    justifyContent: 'flex-end',

  },
  saveButton: {
    backgroundColor: GlobalStyle.constants.colors[1],

  },
  saveText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10,
    color: "#fff"
  }
});

// which props do we want to inject, given the global state?
function mapStateToProps(state) {
  return {
    recs: state.recs,
  };
}

export default connect(mapStateToProps)(RecommendationAdd);
