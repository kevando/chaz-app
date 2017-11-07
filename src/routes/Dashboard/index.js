import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'
import DashboardContainer from './DashboardContainer';

// import * as AppActions from '../../reducers/app/actions';
import * as RecActions from '../../reducers/recommendations/actions';

const mapStateToProps = (state) => {

  // const givenRecsWithFriends =  _.map(state.recommendations.givenRecs, rec => {return {...rec,friend: _.find(state.friends,friend => friend.id === rec.friendId) || {} } })

  return {

    myRecs: state.recommendations.myRecs,//state.recommendations.myRecs, // TMP NEW UI!!! myRecsWithFriends,
    // givenRecs: givenRecsWithFriends,
    // friends: state.friends,
    // app: state.app,
    showOnboarding: state.recommendations.myRecs.length == 0,
    user: state.user,
    // recommendations: state.recommendations
  };
};

// map dispatch to props

export default connect(mapStateToProps, {...RecActions})(DashboardContainer);
