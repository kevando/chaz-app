import React, {Component, PropTypes} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  DeviceEventEmitter
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Actions} from "react-native-router-flux";
import { connect } from 'react-redux';
import * as recActions from '../reducers/rec/actions';
import * as GlobalStyle from '../style/Global';

// this is a traditional React component connected to the redux store
class RecommendationAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recTitle:'',
      recNote:'',
      recType: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    // This gets invoked after ADD_REC updates the state tree
    // Now pop router to recView
    var rec = nextProps.recs.last();
    Actions.recommendationFromAdd({rec:rec.toJS()});
  }

  componentDidMount() {
      this.refs.TitleInput.focus(true); // dont auto show keyboard with popup
  }

  render() {

    return (
      <View style={{flex:1}}>

        {this.renderTitleInput()}

        <View style={{borderTopColor:'#ccc',borderTopWidth:1}}>
          {this.renderNoteInput()}
        </View>

        {( this.state.recTitle == ''
        ?
        null
        :
        <View style={styles.buttonContainer} >
          <TouchableOpacity style={styles.saveButton} onPress={ this.onAddRecPress.bind(this) }>
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
        onChangeText={(recTitle) => this.setState({recTitle})}
        value={this.state.recTitle}
        placeholder={"Add a new recommendation"}
        ref="TitleInput"
        enablesReturnKeyAutomatically={true}
        returnKeyType={'done'}
        onSubmitEditing={this.onAddRecPress.bind(this)}
      />
    )
  }
  renderNoteInput() {
    return (
      <TextInput
        style={{fontSize:15,height: 40,paddingLeft:10}}
        onChangeText={(recNote) => this.setState({recNote})}
        value={this.state.recNote}
        placeholder="Write a note about this moment..."
        ref="NoteInput"
        returnKeyType={'done'}
        onSubmitEditing={this.onAddRecPress.bind(this)}
      />
    )
  }

  onAddRecPress() {
    console.log('state info',this.state);
    this.props.dispatch(recActions.addRec(this.state.recTitle,this.state.recNote));
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
    // onboard: state.onboard
  };
}

export default connect(mapStateToProps)(RecommendationAdd);
