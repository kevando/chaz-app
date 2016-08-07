import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import dismissKeyboard from 'dismissKeyboard'; // might not be safe
import timer from 'react-native-timer';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
export default class RecNote extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rec: this.props.rec,
      note: this.props.rec.note,
      color: "#333",
      borderColor:'#fff',
      showButton: false,
      message:''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({rec:nextProps.rec}); // cause we use previous rec state
  }

  componentWillUnmount() {
    timer.clearTimeout('message');
  }

  render() {
    return (
      <View>
      <AutoGrowingTextInput
          style={[styles.noteInput, { borderColor: this.state.borderColor, color: this.state.color}]}
          onChangeText={(note) => this.setState({note: note})}
          value={this.state.note}
          placeholder="Add a note..."
          ref="NoteInput"
          multiline={true}
          onBlur={ (event) => this.onBlur(event) }
          onFocus={ (event) => this.onFocus(event) }

        />

        <View style={{flex:1,flexDirection:'row',height:15}}>
        {( this.state.showButton // in case we want to do something if note is there
          ?

          <View style={{flex:1,flexDirection:'row',height:40}}>
            <TouchableOpacity onPress={this.onSavePress.bind(this)}>
              <Text style={styles.button}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.onDismissPress.bind(this)}>
              <Text style={styles.dismiss}>Dismiss</Text>
            </TouchableOpacity>
          </View>

          : null
        )}
        <Text>{this.state.message}</Text>
      </View>
    </View>

    );
  }

  onSavePress() {
    dismissKeyboard();
    this.props.onSubmitFunction(this.state.note);
    this.renderMessage('Saved!');
  }

  onDismissPress() {
    this.setState({note: this.state.rec.note}); //reset
    dismissKeyboard();
    this.renderMessage('');
  }


  onFocus(event) {
    this.setState({
      borderColor: '#ededed',
      showButton: true,
      // message:'Editing...',
    })
  }

  onBlur(event) {
    this.setState({
      borderColor: '#fff',
      showButton: false,
    });
  }

  renderMessage(message){
    this.setState({message:message})
    timer.setTimeout( 'message',
      () => {
        this.setState({message:''})
      },3000
    );

  }



}

const styles = StyleSheet.create({

  noteInput: {
    fontSize:15,
    padding:10,
    borderWidth:1,
  },
  button: {
    fontSize:12,
    color:'blue',
    marginRight:10
  },
  dismiss: {
    fontSize:11,
    color:'red',
  }
});
