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

export default class RecTitle extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rec: this.props.rec,
      title: this.props.rec.title,
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
          style={[styles.titleInput, { borderColor: this.state.borderColor, color: this.state.color}]}
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
          placeholder="Add a title...?"
          ref="TitleInput"
          onBlur={ (event) => this.onBlur(event) }
          onFocus={ (event) => this.onFocus(event) }

        />
        <View style={{flex:1,flexDirection:'row',height:10}}>
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
        <Text>{this.state.message}</Text>
      </View>
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

});
