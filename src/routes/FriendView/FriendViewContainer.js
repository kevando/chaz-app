import React, { Component } from 'react';
import FriendView from './FriendView';
import { Actions } from 'react-native-router-flux';
import { AlertIOS } from 'react-native';
import firebase from 'react-native-firebase';
import _ from 'lodash'
const usersRef = firebase.firestore().collection("users")

class FriendViewContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { input: '', user: null }
    // this._deleteRecommendation = this._deleteRecommendation.bind(this)
    // this._onDeletePress = this._onDeletePress.bind(this)
    this._assignUser = this._assignUser.bind(this)
    this._onKeyPress = this._onKeyPress.bind(this)
  }
  componentDidMount() {
    this.setState({
      friendRecs: _.filter(this.props.myRecs,rec => rec.friendId == this.props.friend.id)
    })
  }

  _onKeyPress(input){
    // might want to throw this in redux
    usersRef.where("username", "==", input)
    .get()
    .then((querySnapshot) => {
      // let userFound = null
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            // userFound = doc.data()
            this.setState({user: doc.data()})
        });
        // this.setState({user: userFound})
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

  _assignUser() {
    const { assignUserToFriend, friend, assignUserToRecs } = this.props
    const { user } = this.state
    assignUserToFriend(user,friend)
    assignUserToRecs(user,friend)
  }

  render() {
    console.log(this.props)

    if(!this.props.friend)  { return null }
    return (
      <FriendView
        friend={this.props.friend}
        friendRecs={this.state.friendRecs}
        onKeyPress={this._onKeyPress}
        user={this.state.user}
        onAssignUserPress={this._assignUser}

      />
    );
  }

}

export default FriendViewContainer;
