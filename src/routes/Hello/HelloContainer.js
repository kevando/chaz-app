import React, { Component } from 'react';
import { View, StatusBar ,Text, TextInput, ScrollView} from 'react-native';
import Hello from './Hello'
import { Actions } from 'react-native-router-flux';
import _ from 'lodash'
import styles from './styles';
import { colors } from '../../config/styles'
import { Button } from '../../components/Generic';
import { CategoryPicker } from '../../components/Category';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import * as Animatable from 'react-native-animatable';


class HelloContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nameInput: 'kevin',
      myInvites: [],
      onChangeText: (nameInput) => this.setState({nameInput}),
    }
  }

  _onSaveNamePress = () => {
    const { setUserData, fetchInvites } = this.props
    const { nameInput } = this.state

    setUserData({name: nameInput})
      .then(myInvites => {

        // Search for invites
        fetchInvites("to.name",nameInput.toLowerCase())
          .then(myInvites => {
            // console.warn('invites',myInvites)
            this.setState({myInvites})
          })
      })
      // .then(r => console.warn(r))
  }
  _onGetStartedPress = () => {
    const { user } = this.props
    const initalRecData = {
      to: {uid: user.uid, displayName: user.displayName},
      category: 'app',
      title: 'chaz',
    }
    Actions.push('FirstRec', {initalRecData})

  }


  render() {
    // console.log(this.props.user)
    const { question, nameSaved } = this.state
    const { user } = this.props

    return (
      <Hello
        {...this.state}
        {...this.props}
        onSaveNamePress={this._onSaveNamePress}
        onGetStartedPress={this._onGetStartedPress}
        />
    )
    }



}

export default HelloContainer;



  // _saveName = () => {
  //
  //   this.refs.INPUT.textDance(800)
  //   const { name } = this.state
  //
  //   this.props.checkForInvitesByName(name)
  //
  //   this.props.saveDisplayName(name)
  //     .then(response => {
  //       // this.refs.INPUT.textDance(800) too much delay
  //       this.setState({nameSaved: true,name: name+','})
  //     })
  //     .catch(error => console.warn('updateProfile err', error.message))
  //
  // }

  // _selectCategory = (category) => {
  //   this.setState({category})
  //   // possibly run an animation before this
  //   this.props.onNewRecPress(category)
  // }
  //
  // _startWithChaz = () => {
  //   this.props.startWithChaz((this.state.friendName))
  // }



  //   render_og() {
  //     // console.log(this.props.user)
  //     const { question, nameSaved } = this.state
  //     const { user } = this.props
  //
  //     return (
  //       <View style={styles.container}>
  //         <StatusBar barStyle="light-content" hidden={true} />
  //           <ScrollView>
  //             <Animatable.View style={styles.greetingContainer} ref="GREETING">
  //               <Text style={styles.greetingText}>Hello</Text>
  //
  //                 <NameInput
  //                   placeholder=''
  //                   ref="INPUT"
  //                   autoCapitalize="words"
  //                   value={this.state.name}
  //                   autoCorrect={false}
  //                   autoFocus={true}
  //                   placeholderTextColor="#aaa"
  //                   multiline={false}
  //                   style={styles.inputName}
  //                   onChangeText={(name) => this.setState({name})}
  //                   caretHidden={false}
  //                   selectionColor={'rgba(255,255,255,0.4)'}
  //                   editable={!this.state.nameSaved}
  //                 />
  //               </Animatable.View>
  //
  //
  //
  //         { nameSaved && user.myInvites && user.myInvites.length > 0 && !question &&
  //           <Animatable.View animation="fadeInUp" >
  //             <Text style={styles.subTitle}>Welcome.</Text>
  //             <Text style={styles.paragraph}>Did {user.myInvites[0].from.displayName} tell you about chaz?</Text>
  //             <View style={styles.buttonContainer}>
  //               <Button ghost text="Yes" onPress={()=>this.setState({question:'Did they explain it well?',friendName: user.myInvites[0].from.displayName})}/>
  //               <Button ghost text="No" onPress={()=>this.setState({question:'Did anyone tell you about chaz?'})}/>
  //             </View>
  //             </Animatable.View>
  //         }
  //         { nameSaved && user.myInvites && user.myInvites.length == 0 && !question &&
  //             <Animatable.View animation="fadeInUp" >
  //               <Text style={styles.subTitle}>Welcome.</Text>
  //               <Text style={styles.paragraph}>Do you know how chaz works?</Text>
  //               <View style={styles.buttonContainer}>
  //                 <Button ghost text="Yes" onPress={()=>this.setState({question:'What is something someone recommended?'})}/>
  //                 <Button ghost text="No" onPress={()=>this.setState({question:'Did anyone tell you about chaz?'})}/>
  //               </View>
  //               </Animatable.View>
  //           }
  //
  //
  //
  //         { nameSaved && question == 'Did they explain it well?' &&
  //           <Animatable.View animation="fadeInUp" >
  //             <Text style={styles.subTitle}>Wonderful.</Text>
  //             <Text style={styles.paragraph}>{question}</Text>
  //             <View style={styles.buttonContainer}>
  //               <Button ghost text="Yes" onPress={()=>this.setState({question:'What is something they recommended to you?'})}/>
  //               <Button ghost text="No" onPress={()=>alert('Well call them and ask them to explain it')}/>
  //             </View>
  //             </Animatable.View>
  //         }
  //         { this.state.nameSaved && question == 'What is something someone recommended?' &&
  //           <Animatable.View animation="fadeInUp" >
  //             <Text style={styles.subTitle}>Wonderful.</Text>
  //             <Text style={styles.paragraph}>{question}</Text>
  //             <CategoryPicker callback={this._selectCategory} />
  //             </Animatable.View>
  //         }
  //         { this.state.nameSaved && question == 'What is something they recommended to you?' &&
  //           <Animatable.View animation="fadeInUp" >
  //             <Text style={styles.subTitle}>Awesome.</Text>
  //             <Text style={styles.paragraph}>{question}</Text>
  //             <CategoryPicker callback={this._selectCategory} />
  //           </Animatable.View>
  //         }
  //
  //         { this.state.nameSaved && question == 'Did anyone tell you about chaz?' &&
  //           <Animatable.View animation="fadeInUp" >
  //             <Text style={styles.subTitle}>hmmm.</Text>
  //             <Text style={styles.paragraph}>{question}</Text>
  //             <View style={styles.buttonContainer}>
  //               <Button ghost text="Yes" onPress={this._startWithChaz}/>
  //               <Button ghost text="No" onPress={()=>alert('well how did you get here??')}/>
  //             </View>
  //             </Animatable.View>
  //         }
  //
  // </ScrollView>
  //         {this.state.name != '' && !this.state.nameSaved && <Button animated text="Yep. That's my name" onPress={this._saveName} />}
  //
  //         {!this.state.name && <Animatable.Text animation="fadeIn" delay={10000} style={{color:'white',fontSize:12,}}>What's your name?</Animatable.Text>}
  //         <KeyboardSpacer />
  //
  //       </View>
  //     );
  //     }
