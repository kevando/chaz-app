// // import React, {
// //   Component,
// //   StyleSheet,
// //   Text,
// //   View,
// //   TextInput
// // } from 'react-native';
//
// import React, {Component} from 'react';
//
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   StyleSheet
// } from 'react-native';
//
//
// import { connect } from 'react-redux';
//
// import Button from '../components/button';
// import ddpClient from '../ddp';
//
// import { changeSignInStatus } from '../reducers/app/actions';
//
// export class SignIn extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       email: '',
//       password: '',
//       error: null
//     }
//   }
//
//   validInput() {
//     let { email, password } = this.state;
//     let valid = false;
//     if (email.length && password.length) {
//       this.setState({error: null});
//       valid = true;
//     } else {
//       this.setState({error: 'Email and password cannot be empty.'});
//     }
//
//     return valid;
//   }
//
//   handleSignIn() {
//     var userId = 'test'; // device ID
//     // ddpClient.findUserByUsername(userId, (error, res) => {
//     //   console.log('returned from findbyusernmae function',res)
//     //   console.log('returned from findbyusernmae err?',error)
//     //   if(res) {
//     //     // alert('Are you xyz?')
//     //     this.props.changedSignedIn(true);
//     //   } else {
//     //     alert('Sorry, I dont think youve used chaz before. Please click I am new');
//     //   }
//     //
//     // });
//
//       ddpClient.loginWithUsername(userId, userId, (error, res) => {
//         if (error) {
//           this.setState({error: error.reason})
//         } else {
//           this.props.changedSignedIn(true);
//         }
//       });
//
//
//
//   }
//
//   handleCreateAccount() {
//     var userId = 'test'; // device ID
//     // userId will be pw too
//
//
//     ddpClient.signUpWithUsername(userId, userId, (error, res) => {
//       console.log('returned from findbyusernmae function',res)
//       console.log('returned from findbyusernmae err?',error)
//       // this.setState({error: 'Email and password cannot be empty.'});
//       if (error) {
//         this.setState({error: error.reason})
//       } else {
//         this.props.changedSignedIn(true);
//       }
//     });
//
//   }
//
//   render() {
//     let signIn, createAccount;
//
//     if (this.props.connected) {
//       signIn = <Button text="I been here" onPress={() => this.handleSignIn()} />;
//       createAccount = <Button text="I am new" onPress={() => this.handleCreateAccount()} />;
//     }
//
//     return (
//       <View style={styles.container}>
//         <Text style={styles.main}>
//           Welcome to chaz
//         </Text>
//
//
//         <Text style={styles.error}>{this.state.error}</Text>
//
//         <View style={styles.buttons}>
//           {signIn}
//           {createAccount}
//         </View>
//       </View>
//     );
//   }
// }
//
// const mapStateToProps = (state) => {
//   return {
//     connected: true // this should connect to this.ddp.connected
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     changedSignedIn: (status) => dispatch(changeSignInStatus(status))
//   }
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   main: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginHorizontal: 20,
//     marginVertical: 5,
//     padding: 5
//   },
//   buttons: {
//     flexDirection: 'row'
//   },
//   error: {
//     color: 'red',
//     height: 20
//   }
// });
