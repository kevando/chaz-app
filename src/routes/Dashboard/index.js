import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'
import DashboardContainer from './DashboardContainer';

// import * as AppActions from '../../reducers/app/actions';
import * as RecActions from '../../reducers/recommendations/actions';

const mapStateToProps = (state) => {
  // Append friend data do list of recs
  // console.log('friends',state.friends)
  const myRecsWithFriends =  _.map(state.recommendations.myRecs, rec => {return {...rec,friend: _.find(state.friends,friend => friend.id === rec.friendId) || {} } })
  const givenRecsWithFriends =  _.map(state.recommendations.givenRecs, rec => {return {...rec,friend: _.find(state.friends,friend => friend.id === rec.friendId) || {} } })
  return {
    // recommendations: _.map(state.recommendations.list, rec => {return {...rec,friend:_.find(state.friends,friend => friend.id === rec.friendId)} }),
    myRecs: myRecsWithFriends,//_.filter(allRecs,rec=> rec.uid === state.user.uid),
    givenRecs: givenRecsWithFriends,
    // givenRecs: _.filter(allRecs,rec=> rec.friend.uid === state.user.uid),
    friends: state.friends,
    // activeFilter: state.recommendations.filter,
    app: state.app,
    showOnboarding: state.recommendations.myRecs.length == 0,
    user: state.user,
  };
};

// map dispatch to props

export default connect(mapStateToProps, {...RecActions})(DashboardContainer);
