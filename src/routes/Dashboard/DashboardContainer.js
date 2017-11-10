import React, { Component } from 'react';
import { View, ScrollView, StatusBar ,Text} from 'react-native';
import Dashboard from './Dashboard';
import Hello from '../Hello'
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'
import Confetti from 'react-native-confetti';

class DashboardContainer extends Component {
  // constructor(props) {
  //   super(props)
  // }
  componentWillMount() {
    this.state = {activeFilter: 'Everything'};


    // this.props.onboarding && Actions.replace('GetStarted')

    this.props.onboarding && Actions.replace('Hello')
  }

  // componentWillReceiveProps({recommendations}) {}
  // componentWillUpdate(nextProps, nextState){}
  // componentDidUpdate(prevProps, nextState){}


  componentDidMount() {
    // TMP!!
    console.log('dash mounted',this.props)
    if(this.props.myRecs.length == 1)
      this._throwParty()
    // Actions.push('NewRecLightbox')
    // Actions.push('Profile')
    Actions.push('Inbox')
    // Actions.push('RecView',{rec: this.props.myRecs[0]})
    // Actions.push('RecView',{rec: this.props.givenRecs[0]})
    // Actions.push('FriendView',{friend: this.props.friends[0]})
    // Actions.push('InviteModal',{friend: this.props.friends[0]})


    // tmp testing
    // this.props.fetchInvites("to.phoneNumber",this.props.user.phoneNumber).then((myInvites) => {
    //   Actions.push('RecView',{rec: myInvites[0]} )
    // })

  }


  componentWillUnmount () {
    this._confettiView && this._confettiView.stopConfetti();
  }

  _throwParty = () => {
    if(this._confettiView) {
      // console.warn('_confettiView')
       this._confettiView.startConfetti()
       setTimeout(()=> this._confettiView && this._confettiView.stopConfetti(),2000)
    }
  }

  _changeActiveFilter = (activeFilter) => {
    this.setState({activeFilter})
  }



  _onNewRecPress = () => {
    const { user, initNewRec } = this.props
    const initalRecData = {
      to: {uid: user.uid, displayName: user.displayName},
      // category: 'app',
      // title: 'chaz',
    }
    Actions.push('NewRecLightbox', {initalRecData})
  }

  _confettiComponent = () => {
    return (
      <Confetti
        ref={(node) => this._confettiView = node}
        confettiCount={100}
        duration={3000}
        timeout={100}
      />)
  }

  render() {
    console.log('Dash',this.props)
    // return null
    // const { showOnboarding } = this.props;

      return (

        <Dashboard
          {...this.props}
          {...this.state}
          onNewRecPress={this._onNewRecPress}
          changeActiveFilter={this._changeActiveFilter}
          Confetti={this._confettiComponent}
        />
      )

  }
}

export default DashboardContainer;
