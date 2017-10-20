import React, { Component } from 'react';
import RecView from './RecView';
import { Actions } from 'react-native-router-flux';
import { AlertIOS } from 'react-native';

class RecViewContainer extends Component {
  constructor(props) {
    super(props)
    this._deleteRecommendation = this._deleteRecommendation.bind(this)
    this._onDeletePress = this._onDeletePress.bind(this)
    this._onEditPress = this._onEditPress.bind(this)
  }

  _onEditPress() {
    Actions.push('EditTitle',{rec: this.props.rec })
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
    deleteRecommendation(rec.id) // redux and firestore
    Actions.pop()
  }

  render() {

    if(!this.props.rec)  { return null }
    return (
      <RecView
        rec={this.props.rec}
        onDeletePress={this._onDeletePress}
        onEditPress={this._onEditPress}
      />
    );
  }

}

export default RecViewContainer;
