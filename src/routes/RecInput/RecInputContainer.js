import React, { Component } from 'react';
import { LayoutAnimation } from 'react-native';
import Meteor, { Accounts } from 'react-native-meteor';
import RecInput from './RecInput';

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


    Meteor.call('addRec',{title:title,uid: Meteor.userId()},function(err,res){
      console.log('added rec',err)
      console.log('added rec',res)
    })

      // Accounts.createUser({ username, password: username }, (err) => {
      //   if (err) {
      //     console.log('getstarted err',err)
      //     this.handleError(err.reason);
      //     // if there is an error, we are going to assume the user exists
      //     this.handleSignIn();
      //   } else {
      //     // hack because react-native-meteor doesn't login right away after sign in
      //     this.handleSignIn();
      //   }
      // });

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
