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
    // Actions.push('Reminders')
    // Actions.push('RecView',{rec: this.props.myRecs[0]})
    // Actions.push('FriendView',{friend: this.props.friends[0]})
    // Actions.push('InviteModal',{friend: this.props.friends[0]})

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

  chain = () => {
    const { initNewRec, user } = this.props
    return (
      new Promise(function(resolve,reject) {
      initNewRec({to: user.uid})
    })
  )
  }

  _onNewRecPress = () => {
    this.chain().then(Actions.push('NewRecLightbox'))
  }

  _onBrandNewRecPress = (category) => {
    const { initNewRec, user } = this.props
    initNewRec({to: user.uid, category})
    Actions.push('NewRecLightbox',{walkthrough: true, category})
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
    // console.log('Dash',this.props.recommendations)
    // return null
    const { showOnboarding } = this.props;

    if(showOnboarding) {
    // if(false) {
      return (
        <Hello
          {...this.props}
          {...this.state}
          onNewRecPress={this._onBrandNewRecPress}
        />
      )
    } else {
      return (

        <Dashboard
          {...this.props}
          {...this.state}
          onNewRecPress={this._onNewRecPress}
          changeActiveFilter={this._changeActiveFilter}
          onNewGivenRecPress={() => Actions.push('InputStack',{given: true})}
          Confetti={this._confettiComponent}
        />
      )
    }
  }
}

export default DashboardContainer;
