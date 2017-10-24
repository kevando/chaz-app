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
    this._onCategoryPress = this._onCategoryPress.bind(this)
    this._onAssignPress = this._onAssignPress.bind(this)
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
    deleteRecommendation(rec) // redux and firestore
    Actions.pop()
  }
  _onCategoryPress(rec,category) {
    rec.category = category
    this.props.updateRecommendation(rec)
  }
  _onAssignPress(username){
    const { assignUserToFriend, rec } = this.props
    assignUserToFriend(rec, username) // i think we should know for sure if this user exists
  }

  render() {

    if(!this.props.rec)  { return null }
    return (
      <RecView
        rec={this.props.rec}
        onDeletePress={this._onDeletePress}
        onEditPress={this._onEditPress}
        onCategoryPress={this._onCategoryPress}
        updateRecommendation={this.props.updateRecommendation}
        onAssignPress={this._onAssignPress}
      />
    );
  }

}

export default RecViewContainer;
