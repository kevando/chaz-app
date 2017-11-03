import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'
import HelloContainer from './HelloContainer';

import * as UserActions from '../../reducers/user/actions';
import * as RecActions from '../../reducers/recommendations/actions';

const mapStateToProps = (state) => {
  // Append friend data do list of recs
  // console.log('friends',state.friends)
  // const myRecsWithFriends =  _.map(state.recommendations.myRecs, rec => {return {...rec,friend: _.find(state.friends,friend => friend.id === rec.friendId) || {} } })
  // const givenRecsWithFriends =  _.map(state.recommendations.givenRecs, rec => {return {...rec,friend: _.find(state.friends,friend => friend.id === rec.friendId) || {} } })
  return {
    // recommendations: _.map(state.recommendations.list, rec => {return {...rec,friend:_.find(state.friends,friend => friend.id === rec.friendId)} }),
    // myRecs: state.recommendations.myRecs, // TMP NEW UI!!! myRecsWithFriends,
    // givenRecs: givenRecsWithFriends,
    // givenRecs: _.filter(allRecs,rec=> rec.friend.uid === state.user.uid),
    friends: state.friends,
    unfinished: state.recommendations.unfinished,
    app: state.app,
    showOnboarding: state.recommendations.myRecs.length == 0,
    user: state.user,
  };
};

// map dispatch to props

export default connect(mapStateToProps, {...RecActions, ...UserActions})(HelloContainer);
