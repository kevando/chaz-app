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
      // updateRec: (recData) => this.setState({rec: {...this.state.rec, ...recData }}),
    }

  }
  componentDidMount() {
    // const { recLive, rec } = this.props
    // if live rec not found, dont set it
    // this.setState({rec: recLive || rec})
    // console.warn('recLive',recLive)
  }
  componentWillReceiveProps({rec}) {
    // if live rec not found, dont set it
    this.setState({rec})
    // console.warn('recLive',recLive)

  }
  _saveRec = () => {
    let newRec = this.state.rec // might not be the right way to clone object
    delete newRec.friend // dont add this to firebase
    this.props.updateRec(newRec.id,{...newRec}) // probly not the best
    this.setState({isEditing: false})
  }

  _onDeletePress = () => {
    AlertIOS.alert(
      'Are you sure?',
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
        {text: 'Delete', onPress: () => this._deleteRecommendation() ,style:'destructive'},
      ],
    )
  }
  _deleteRecommendation = () => {
    const { deleteRecommendation, rec } = this.props
    deleteRecommendation(rec)
    Actions.pop()
  }

  _onAssignPress = (username) => {
    const { assignUserToFriend, rec } = this.props
    assignUserToFriend(rec, username) // i think we should know for sure if this user exists
  }

  _acceptInvitation = () => {
    // this should turn out to be similar to accepting any ol rec
    const { rec, user, updateFriendData, addFriend, acceptInvitationRedux } = this.props

    console.log('accept invite')

    addFriend({name: rec.from.displayName,uid: rec.from.uid})
      .then(friend => {
        console.log('added friend',friend)
        acceptInvitationRedux(rec,friend)
          .then((rec) => {
            // console.warn('accepted invite', rec)
            updateFriendData(rec.to,{uid: user.uid}).
              then(()=> {
                // and finally redirect user
                Actions.replace('Dashboard')
              })
              // .then(console.warn('updated friend'))
          })


      })
    // finally update inviters friend obj w this user's uid
  }
  _setGrade = (grade, message) => {
    const { rec, setGrade } = this.props

    setGrade(rec, grade, message)
  }

  render() {
    // console.log('RecViewContainer props',this.props)
    // console.log('RecViewContainer state',this.state)

    if(!this.props.rec)  { return null }
    return (
      <RecView
        {...this.state}
        app={this.props.app}
        user={this.props.user}
        acceptInvitation={this._acceptInvitation}
        saveRec={this._saveRec}
        onDeletePress={this._onDeletePress}
        updateRec={this.props.updateRec}
        onAssignPress={this._onAssignPress}
        setRecReminder={this.props.setRecReminder}
        setGrade={this._setGrade}
      />
    );
  }

}

export default RecViewContainer;
