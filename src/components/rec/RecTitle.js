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

export default class RecTitle extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rec: this.props.rec,
      title: this.props.rec.title,
      color: "#333",
      borderColor:'#000',
      showButton: false,
      message:'first'
    }
  }

  render() {
    return (
      <View>
      <Text style={styles.message}>{this.state.message}</Text>
      <TextInput
          style={[styles.titleInput, { borderColor: this.state.borderColor, color: this.state.color}]}
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
          placeholder="Add a title...?"
          ref="TitleInput"
          onChange={ (event) => this.onChange(event) }
          onBlur={ (event) => this.onBlur(event) }
          onFocus={ (event) => this.onFocus(event) }

        />

        {( this.state.showButton // in case we want to do something if note is there
          ?

          <View style={{flex:1,flexDirection:'row'}}>
            <TouchableOpacity onPress={this.onSavePress.bind(this)}>
              <Text style={styles.button}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.onDismissPress.bind(this)}>
              <Text style={styles.dismiss}>Dismiss</Text>
            </TouchableOpacity>
          </View>

          : null
        )}


</View>

    );
  }

  onSavePress() {
    dismissKeyboard();
    this.props.onSubmitFunction(this.state.title);
    this.renderMessage('Saved!');
  }

  onDismissPress() {
    this.setState({title: this.state.rec.title}); //reset
    dismissKeyboard();
    this.renderMessage('');
  }

  onChange(event) {
    this.setState({
      // displayHeight: Math.min(135, event.nativeEvent.contentSize.height+20),
      // inputHeight: event.nativeEvent.contentSize.height
    });
  }

  onFocus(event) {
    this.setState({
      borderColor: '#ededed',
      showButton: true,
      message:'Editing...',
      // displayHeight: this.state.editHeight
    })
  }

  onBlur(event) {
    this.setState({
      borderColor: '#fff',
      showButton: false,
      // displayHeight: this.state.inputHeight
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

  titleInput: {
    fontSize:25,
    fontWeight:'700', // doesnt work for input, probly should consider this
    borderColor:"#000",
    padding:10,
    borderWidth:1,
    height:50
  },
  button: {
    fontSize:12,
    color:'blue',
    marginRight:10
  },
  dismiss: {
    fontSize:11,
    color:'red',
  },
  message:{
    position:'absolute',
    top:1,
    right:1,
  }
});
