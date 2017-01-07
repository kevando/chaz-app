import React, { Component } from 'react';

import Dashboard from './Dashboard';

class DashboardContainer extends Component {
  // constructor


  // bunch of functions


  render() {
    return <Dashboard username={this.props.username} />



    // possible things to pass along

    // updateState={this.setState.bind(this)}
    // signIn={this.handleSignIn.bind(this)}
    // setUserId={this.props.setUserId}
    // {...this.state}
  }
}

export default DashboardContainer;
