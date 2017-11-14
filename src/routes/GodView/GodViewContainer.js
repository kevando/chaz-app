import React, { Component } from 'react';
import GodView from './GodView';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'

import firebase from 'react-native-firebase'

class GodViewContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  componentWillMount(){


    const { fetchAllRecs, user } = this.props

    firebase.config().fetch()
      .then(() => {
        return firebase.config().activateFetched();
      })
      .then((activated) => {
        console.log('activated?',activated)
        if (!activated) console.log('Fetched data not activated');
        return firebase.config().getValue('god_user_id');
      })
      .then((snapshot) => {
        const god_user_id = snapshot.val();
        // console.warn('god_user_id',god_user_id)

        if(god_user_id == user.uid || true) {
          fetchAllRecs().then(allRecs=>this.setState({allRecs: _.orderBy(allRecs,['createdAt'],'desc')}))
        } else {
          console.warn('You are not god')
        }

    // continue booting app
  })
  .catch(console.error);


    // fetchAllRecs().then(allRecs=>this.setState({allRecs}))
  }
  // componentDidMount(){}
  // componentWillReceiveProps(){}
  // shouldComponentUpdate(){}
  // componentWillUpdate(){}
  // componentDidUpdate(){}
  // componentWillUnmount(){}
  // componentDidCatch(){}


  render() {

      return (
        <GodView
          {...this.props}
          {...this.state}
        />
      )
  }
}

export default GodViewContainer;
