import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Button } from '../../components/Generic';
import * as Animatable from 'react-native-animatable';
import NewRec from './NewRec';
import { Actions } from 'react-native-router-flux';

class InputTitleContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      friendName: '',
      buttonText: 'Next',
      placeholderText: 'Type recommendation here',
      nextRoute: 'InputFriend',
      inputHeight: 0,

      updateState: (state) => this.setState(state),
      friends: this.props.friends.reverse(),

    }
  }
  componentDidMount() {
    const { rec, unfinished, user } = this.props;
    // this.props.initNewRec({to: user.uid}) // tmp?
    //
    // if(rec) // EDITING rec.
    //   this.setState({title:rec.title, buttonText: 'Save' })
    //
    // if(unfinished.from) // GIVING rec
    //   this.setState({placeholderText: 'What are you recommending?', nextRoute: 'ConfirmRecommendation' })
  }


  // onNextPress() {
  //
  //   const { setTitle, rec, updateRecommendation } = this.props;
  //
  //   if(rec) {// if Editing..
  //     rec.title = this.state.title
  //     updateRecommendation(rec);
  //     Actions.pop()
  //   } else {
  //     setTitle(this.state.title)
  //     // Actions.push(this.state.nextRoute)
  //   }
  // }
  _setTitle = () => {
    // alert(this.state.title)
    this.props.setTitle(this.state.title)
  }

  // _setFriend = () => {
  //   // alert(this.state.friendName)
  //   // return
  //   const { addFriend, addRecommendation } = this.props
  //   addFriend({name: this.state.friendName})
  //
  //   setTimeout(() => {
  //     addRecommendation().then(Actions.pop()
  //   )},400)
  // }

  // _onFriendPress = (friend) => { // add existing friend
  //   const { setFriendId } = this.props;
  //   setFriendId(friend.id); // Redux
  //
  //   this.props.addRecommendation(); // Redux
  //   Actions.pop() // might error
  //
  // }

  _sendRec = () => {
    // console.warn(this.state.title)
    this.props.setTitle(this.state.title)
    // this.props.addRecommendation(); // Redux

  }



  render() {
    // console.log(this.props)

    return (
      <NewRec
        {...this.state}
        walkthrough={this.props.walkthrough}
        category={this.props.category}
        unfinished={this.props.unfinished}
        onNextPress={this._setTitle}
        setFriend={this._setFriend}
        setFriendRedux={this.props.setFriend}
        addFriendRedux={this.props.addFriend}
        saveRecRedux={this.props.saveRec}
        onFriendPress={this._onFriendPress}
        user={this.props.user}
        sendRec={this._sendRec}
      />
    );
  }


}

export default InputTitleContainer;
