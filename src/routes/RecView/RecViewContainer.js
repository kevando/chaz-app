import React, { Component } from 'react';
import RecView from './RecView';
import { Actions } from 'react-native-router-flux';
import { AlertIOS } from 'react-native';

class RecViewContainer extends Component {
  constructor(props) {
    super(props)
    // console.log('PROPS!!!!!',props)
    this.state = {
      isEditing: false,
      rec: props.rec,
      updateState: (state) => this.setState(state),
      updateRec: (recData) => this.setState({rec: {...this.state.rec, ...recData }}),
    }
    this._deleteRecommendation = this._deleteRecommendation.bind(this)
    this._onDeletePress = this._onDeletePress.bind(this)
    this._onAssignPress = this._onAssignPress.bind(this)
  }

  _saveRec = () => {
    this.props.updateRecommendation(this.state.rec)
    this.setState({isEditing: false})
  }

  _onDeletePress() {
    AlertIOS.alert(
      'Are you sure?',
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
        {text: 'Delete', onPress: () => this._deleteRecommendation() ,style:'destructive'},
      ],
    )
  }
  _deleteRecommendation() {
    const { deleteRecommendation, rec } = this.props
    deleteRecommendation(rec) // redux and firestore
    Actions.pop()
  }

  _onAssignPress(username){
    const { assignUserToFriend, rec } = this.props
    assignUserToFriend(rec, username) // i think we should know for sure if this user exists
  }

  render() {
    // console.log('RecViewContainer STATE',this.state)

    if(!this.props.rec)  { return null }
    return (
      <RecView
        {...this.state}
        app={this.props.app}
        saveRec={this._saveRec}
        onDeletePress={this._onDeletePress}
        updateRecommendation={this.props.updateRecommendation}
        onAssignPress={this._onAssignPress}
      />
    );
  }

}

export default RecViewContainer;
