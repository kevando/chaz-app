import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Button } from '../../components/Generic';
import * as Animatable from 'react-native-animatable';
import NewRec from './NewRec';
import { Actions } from 'react-native-router-flux';

class InputTitleContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      friendName: '',
      buttonText: 'Next',
      placeholderText: 'Type recommendation here',
      nextRoute: 'InputFriend',

      updateState: (state) => this.setState(state),

    }
  }
  componentDidMount() {
    const { rec, unfinished } = this.props;

    if(rec) // EDITING rec.
      this.setState({title:rec.title, buttonText: 'Save' })

    if(unfinished.from) // GIVING rec
      this.setState({placeholderText: 'What are you recommending?', nextRoute: 'ConfirmRecommendation' })
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

    const { setTitle, rec, updateRecommendation } = this.props;

    if(rec) {// if Editing..
      rec.title = this.state.title
      updateRecommendation(rec);
      Actions.pop()
    } else {
      setTitle(this.state.title)
      // Actions.push(this.state.nextRoute)
    }
  }
  _setTitle = () => {
    this.props.setTitle(this.state.title)
  }

  _setFriend = () => {
    // TMP saving the rec for now

    this.props.addRecommendationDev(this.state.friendName); // Redux
    Actions.pop()
  }



  render() {
    // console.log(this.props)

    return (
      <NewRec
        {...this.state}
        renderButton={this.renderButton.bind(this)}
        unfinished={this.props.unfinished}
        setTitle={this._setTitle}
        setFriend={this._setFriend}
      />
    );
  }


}

export default InputTitleContainer;
