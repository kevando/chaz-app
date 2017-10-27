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
    this.state = { input: '', userFound: null }
    // this._deleteRecommendation = this._deleteRecommendation.bind(this)
    this._onGiveRecPress = this._onGiveRecPress.bind(this)
    this._assignUser = this._assignUser.bind(this)
    this._onKeyPress = this._onKeyPress.bind(this)
  }
  // componentDidMount() {
  //   this.setState({
  //     friendRecs: _.filter(this.props.myRecs,rec => rec.friendId == this.props.friend.id)
  //   })
  // }

  _onKeyPress(input){
    // might want to throw this in redux
    this.setState({userFound: null}) // reset user obj
    usersRef.where("username", "==", input)
    .get()
    .then((querySnapshot) => {
      // let userFound = null
        querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            // userFound = doc.data()
            this.setState({userFound: doc.data()})
        });
        // this.setState({user: userFound})
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

  _assignUser() {
    const { assignUserToFriend, friend, assignUserToRecs } = this.props
    const { userFound } = this.state
    if(!userFound){
      alert('No user found, sorry')
    } else {
      alert('User connected!')
      Actions.refresh({friend: {...friend,uid:userFound.uid}}) // tmp bad code
      // this.setState({input:''})
      assignUserToFriend(userFound,friend)
      assignUserToRecs(userFound,friend)
    }

  }
  _onGiveRecPress() {
    const { initNewRec,friend, user } = this.props
    initNewRec({from: user.uid, to: friend.uid, friend: {name: 'me'}})
    Actions.push('InputStack')
  }

  render() {
    // console.log(this.props)

    if(!this.props.friend)  { return null }
    return (
      <FriendView
        givenRecs={this.props.givenRecs}
        friend={this.props.friend}
        myRecs={this.props.myRecs}
        onKeyPress={this._onKeyPress}
        user={this.props.user}
        userFound={this.state.userFound}
        onAssignUserPress={this._assignUser}
        onGiveRecPress={this._onGiveRecPress}
      />
    );
  }

}

export default FriendViewContainer;
