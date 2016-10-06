import React, { Component } from 'react';
import { LayoutAnimation } from 'react-native';
import Meteor, { Accounts } from 'react-native-meteor';
import RecInput from './RecInput';
import Routes from '../../config/routes';

class RecInputContainer extends Component {
  constructor(props) {
    super(props);

    this.mounted = false;
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      confirmPasswordVisible: false,
      error: null,
    };
  }

  componentWillMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleError(error) {
    this.mounted && this.setState({ error });
  }

  validInput(overrideConfirm) {
    const { email, password, confirmPassword, confirmPasswordVisible } = this.state;
    let valid = true;

    if (email.length === 0 || password.length === 0) {
      this.handleError('Email and password cannot be empty.');
      valid = false;
    }

    if (!overrideConfirm && confirmPasswordVisible && password !== confirmPassword) {
      this.handleError('Passwords do not match.');
      valid = false;
    }

    if (valid) {
      this.handleError(null);
    }

    return valid;
  }


  handleAddRec() {
    const { title } = this.state;

    // console.log('adding rec', title)
    const rec = {title:title,uid: Meteor.userId()}



    Meteor.call('addRec',rec,function(err,res){
      console.log('added rec',err)
      console.log('added rec',res)
      this.props.navigator.replace(Routes.getRecRoute(rec));
    })

  
  }

  render() {
    return (
      <RecInput
        updateState={this.setState.bind(this)}
        addRec={this.handleAddRec.bind(this)}
        {...this.state}
      />
    );
  }
}

export default RecInputContainer;
