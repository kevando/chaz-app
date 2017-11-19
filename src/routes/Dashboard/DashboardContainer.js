import React, { Component } from 'react';
import { Alert } from 'react-native';
import Dashboard from './Dashboard';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'



class DashboardContainer extends Component {

  componentWillMount() {
    this.state = {activeFilter: 'Everything'};
  }

  // componentWillReceiveProps({recommendations}) {}
  // componentWillUpdate(nextProps, nextState){}
  // componentDidUpdate(prevProps, nextState){}


  componentDidMount() {
    // const { onboarding, setAppData } = this.props
    // // if(onboarding)
    //   // setAppData({onboarding: true})
    // Actions.push('NewRecLightbox')
    // Actions.push('Inbox')
    // Actions.push('Register')
    Actions.push('RecView',{rec: this.props.myRecs[0]})
    // Actions.push('RecView',{rec: this.props.givenRecs[0]})
    // Actions.push('FriendView',{friend: this.props.friends[0]})
    // Actions.push('InviteModal',{friend: this.props.friends[0]})
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
  _goToOnboarding = () => {
      Alert.alert('Are you sure?',`You will sign out of this account.`,
      [
        { text:'Nevermind' },
        { text:'Sign Out', onPress: this.props.signOut }
      ])

  }

  render() {
    // console.log('Dash',this.props)
    // return null
    // const { showOnboarding } = this.props;

      return (

        <Dashboard
          {...this.props}
          {...this.state}
          onNewRecPress={this._onNewRecPress}
          changeActiveFilter={this._changeActiveFilter}

          goToOnboarding={this._goToOnboarding}
        />
      )

  }
}

export default DashboardContainer;
