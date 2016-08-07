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

export default class RecNote extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rec: this.props.rec,
      note: this.props.rec.note,
      color: "#333",
      borderColor:'#000',
      displayHeight:100, // tmp, this will be a problem with recr on rec view
      inputHeight:100, // tmp, this will be a problem with recr on rec view
      editHeight:200,
      showButton: false,
      message:''
    }
  }

  componentDidMount() {
    console.log('noteinput measure layout',this.refs.NoteInput)
    // console.log('get height?',this.refs.NoteInput)

    // inputHeight: event.nativeEvent.contentSize.height
  }

  render() {
    return (
      <View>
      <Text>{this.state.message}</Text>
      <TextInput
          style={[styles.noteInput, { height: this.state.displayHeight, borderColor: this.state.borderColor, color: this.state.color}]}
          onChangeText={(note) => this.setState({note: note})}
          value={this.state.note}
          placeholder="Add a note..."
          ref="NoteInput"
          multiline={true}
          onChange={ (event) => this.onChange(event) }
          onBlur={ (event) => this.onBlur(event) }
          onFocus={ (event) => this.onFocus(event) }

        />

        {( this.state.showButton // in case we want to do something if note is there
          ?

          <View style={{flex:1,flexDirection:'row'}}>
            <TouchableOpacity onPress={this.onSavePress.bind(this)}>
              <Text style={styles.button}>Save Note</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.onDismissPress.bind(this)}>
              <Text style={styles.dismiss}>Dismiss Keyboard</Text>
            </TouchableOpacity>
          </View>

          : null
        )}


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

  onChange(event) {
    this.setState({
      // displayHeight: Math.min(135, event.nativeEvent.contentSize.height+20),
      inputHeight: event.nativeEvent.contentSize.height
    });
  }

  onFocus(event) {
    this.setState({
      borderColor: '#ededed',
      showButton: true,
      message:'Editing...',
      displayHeight: this.state.editHeight
    })
  }

  onBlur(event) {
    this.setState({
      borderColor: '#fff',
      showButton: false,
      displayHeight: this.state.inputHeight
    });
  }

  renderMessage(message){
    this.setState({message:message})
    timer.setTimeout( 'loginTimeout',
      () => {
        this.setState({message:''})
      },2000
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
    backgroundColor:'blue',
    color:"#fff",
    padding:10
  },
  dismiss: {

    textAlign:'right',
    color:'red',
  }
});
