import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Button } from '../../components/Generic';
import * as Animatable from 'react-native-animatable';
import RecInput from './RecInput';
import { Actions } from 'react-native-router-flux';

class RecInputContainer extends Component {

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
      ready: false,
    }
  }

  componentWillMount() {
    // check for initial data
    console.log(this.props)
    const { initNewRec, initalRecData } = this.props
    initNewRec(initalRecData)
      .then(r => {
        // console.log('r',r)
        this.setState({ready: true})
      })
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

    this.props.setTitle(this.state.title)
  }



  _sendRec = () => {
    // console.warn(this.state.title)
    this.props.setTitle(this.state.title)
    // this.props.addRecommendation(); // Redux

  }



  render() {
    if(!this.state.ready) { return null } // or maybe some loading

    return (
      <RecInput
        {...this.state}
        setAppData={this.props.setAppData}
        walkthrough={this.props.walkthrough}
        category={this.props.category}
        unfinished={this.props.unfinished}
        onNextPress={this._setTitle}
        setFriend={this._setFriend}
        setFriend={this.props.setFriend}
        addFriend={this.props.addFriend}
        saveRecRedux={this.props.saveRec}
        onFriendPress={this._onFriendPress}
        user={this.props.user}
        sendRec={this._sendRec}
      />
    );
  }


}

export default RecInputContainer;
