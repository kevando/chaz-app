import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'
import HelloContainer from './HelloContainer';

import * as UserActions from '../../reducers/user/actions';
import * as RecActions from '../../reducers/recommendations/actions';

const mapStateToProps = (state) => {

  return {
    friends: state.friends,
    unfinished: state.recommendations.unfinished,
    app: state.app,
    // showOnboarding: state.recommendations.myRecs.length == 0,
    user: state.user,
  };
};

// map dispatch to props

export default connect(mapStateToProps, {...RecActions, ...UserActions})(HelloContainer);
