import React, {Component} from 'react';
import ReactNative, {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Actions} from "react-native-router-flux";

// fuck this shit I dont use this anymore
// import { createAnimatableComponent } from 'react-native-animatable';
// const Status = createAnimatableComponent(ReactNative.Text);
// const timer = require('react-native-timer');

export default class RecTitle extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    var {rec} = this.props;
    return (
      <View>
        <TouchableOpacity onPress={this.onTitlePress.bind(this)}>
          <Text style={styles.title}>{rec.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  onTitlePress(){
    var {rec, onPress} = this.props;
    onPress({rec: rec});
  }
  // this was such a fucking pain in the ass trying to get this to work
  // basically expanding the input on edit does not work very well at all
  // render_input() {
  //
  //   return (
  //     <View>
  //     <TextInput
  //     minHeight={40}
  //
  //       onChangeHeight={this._onChangeHeight}
  //       style={[styles.input,{ backgroundColor: this.state.backgroundColor, color: this.state.color }]}
  //       onChangeText={(title) => this.setState({title})}
  //       value={this.state.title}
  //       placeholder="What do you call this recommendation?"
  //       ref={component => this._textInput = component}
  //       returnKeyType={'done'}
  //       multiline={true}
  //       onSubmitEditing={this.onSubmitEditingPress.bind(this)}
  //       onBlur={this.onBlur.bind(this)}
  //       onFocus={this.onFocus.bind(this)}
  //       onKeyPress={this.handleKeyDown.bind(this)}
  //       onChange={(event) => console.log('onChange',event)}
  //       onContentSizeChange={(event) => console.log('onContentSizeChange',event)}
  //       onChangeText={(event) => console.log('onLayout',event)}
  //     />
  //
  //       <Status ref="status" style={[{ color: this.state.statusColor }, styles.status]}>
  //         {this.state.status}
  //       </Status>
  //
  //     </View>
  //   );
  // }
  // _onChangeHeight(before, after) {
  //   console.log('before: ' + before + ' after: ' + after);
  // }
  //
  // handleKeyDown(e) {
  //   if(e.nativeEvent.key == "Enter"){
  //       // dismissKeyboard();
  //       this._textInput.blur(); // dismiss keyboard
  //
  //   }
  // }
  // onSubmitEditingPress() {
  //   var newRec = this.props.rec;
  //   newRec.title = this.state.title;
  //   this.props.updateRec(newRec);
  //   // reset display
  //   this.setState({ status:'Saved!',statusColor:'green',backgroundColor: '#fff'}); // reset display
  //   var statusRef = this.refs['status']; // now fucking delay that shit!!
  //   timer.setTimeout(this,'fuckingdelays', function(){statusRef['fadeOut'](800)}, 2000);
  // }
  // onBlur() {
  //   Actions.refresh({rightTitle: "", onRight:()=> console.log('right clicked') }); // reset right button
  // }
  // onFocus() {
  //   this.refs['status']['fadeIn'](100);
  //   this.setState({ status:'editing',statusColor:'purple',backgroundColor: '#ededed'})
  //   Actions.refresh({rightTitle: "Dismiss", onRight:() => this.onDismiss(), rightButtonTextStyle: {color:'red'} })
  // }
  // onDismiss() {
  //   // this._textInput.setNativeProps({text: this.props.rec.title}); // reset title input
  //   this.setState({ status:'Dismissed',statusColor:'red',backgroundColor: '#fff'}); // reset display
  //   this._textInput.blur(); // dismiss keyboard
  //   var statusRef = this.refs['status']; // now fucking delay that shit!!
  //   timer.setTimeout(this,'fuckingdelays', function(){statusRef['fadeOut'](800)}, 2000);
  // }

}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    // paddingLeft:10,
    borderColor: '#ccc',
    borderWidth:0,
    marginTop:10,
    marginBottom:10
  },
  // input: {
  //   fontSize: 25,
  //
  //   paddingLeft:10,
  //   borderColor: '#ccc',
  //   borderWidth:1,
  // },
  // status: {
  //   position: 'absolute',
  //   right: 7,
  //   top: 12
  // },
  // animatable: {
  //   padding: 20,
  //   margin: 10,
  // }

})
