import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'
import DashboardContainer from './DashboardContainer';

import {setAppData, signOut} from '../../reducers/app/actions';
import * as RecActions from '../../reducers/recommendations/actions';

const mapStateToProps = (state) => {

  return {

    myRecs: _.filter(state.recommendations.myRecs,rec => rec.status != "open"),
    givenRecs: state.recommendations.givenRecs,
    friends: state.friends, // mostly for testing
    myInvites: state.app.myInvites,
    onboarding: state.app.onboarding,
    user: state.user,
    app: state.app,
  };
};

// map dispatch to props

export default connect(mapStateToProps, {...RecActions, setAppData, signOut})(DashboardContainer);
