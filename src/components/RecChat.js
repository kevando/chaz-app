import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as firebaseActions from '../reducers/firebase/actions';
import * as Global from '../style/Global';

// tmp
import * as Immutable from 'immutable';

class RecChat extends Component {
  constructor(props) {
    super(props);
    var rec_id = this.props.rec.id;
    // console.log('recid',rec_id)
    this.props.dispatch(firebaseActions.listenForMessages(rec_id)); // check if this unmounts
  }


  render() {
    // tmp commenting this out
    // {this.renderFilter('grade')}
    var messages = this.props.messages;
    console.log('messages',messages)

    return (

      <View style={{height:200,borderWidth:2,borderColor:'#ccc'}} >

          {this.renderChatMessages(messages)}

        </View>

    )
  }

  onFilterPress(filter){
    this.props.dispatch(appActions.setFilter(filter));
  }

  renderChatMessages(messages) { // these variables are not named very well
    if(messages.size == 0)
      return(<Text>No chat meesages yet</Text>);

    var messageList = messages.map(function(message){
      console.log('message',message)
      return(<Text key={message._key}>{message.message}</Text>)
    })

    return messageList;


  }

}

function mapStateToProps(state) {
  return {
    app: state.app, // depending how I do this. I probably only need onboarding here
    messages: state.messages
  }
}

export default connect(mapStateToProps)(RecChat);
