import React, { Component } from 'react';

import InputTitle from './InputTitle';

class InputTitleContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {title: ''}
  }


  // bunch of functions


  render() {
    return (
      <InputTitle
        navigator={this.props.navigator}
        updateState={this.setState.bind(this)}
        onNextPress={() => this.props.setTitle(this.state.title)}
        {...this.props}
      />
    )


  }
}

export default InputTitleContainer;
