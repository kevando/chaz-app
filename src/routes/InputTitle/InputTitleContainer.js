import React, { Component } from 'react';
import { Alert } from 'react-native';
import Button from '../../components/Button';
import * as Animatable from 'react-native-animatable';

import InputTitle from './InputTitle';

import { Actions } from 'react-native-router-flux';

class InputTitleContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {title: '', buttonText: 'Next'}
  }
  componentDidMount() {
    if(this.props.rec) // if Editing..
      this.setState({title:this.props.rec.title, buttonText: 'Save' })
  }

  renderButton() {
    const { title, buttonText } = this.state
    if(title)
      return (
        <Animatable.View animation='fadeInUp'
          duration={500}
        >
          <Button text={buttonText} onPress={this.onNextPress.bind(this)} />
        </Animatable.View>
      )
  }

  onNextPress() {
    const { setTitle, rec, updateRecommendation, given } = this.props;

    if(rec) {// if Editing..
      rec.title = this.state.title
      updateRecommendation(rec); // Redux
      Actions.pop()
    } else {
      // if giving this rec
      if(given)
        setTitle(this.state.title); // Redux
      else
        setTitle(this.state.title); // Redux

      Actions.push('InputFriend')
    }
  }

  render() {


    return (
      <InputTitle
        title={this.state.title}
        showKeyboard={this.props.showKeyboard}
        updateState={this.setState.bind(this)}
        renderButton={this.renderButton.bind(this)}
      />
    );
  }

}

export default InputTitleContainer;
