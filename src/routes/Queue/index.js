import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash'
import QueueContainer from './QueueContainer';

import {setAppData, signOut} from '../../reducers/app/actions';
import * as RecActions from '../../reducers/recommendations/actions';

const mapStateToProps = (state) => {

  return {
    // myRecs: _.filter(state.recommendations.myRecs,rec => rec.status != "open"),
    myQueue: state.recommendations.myQueue,
    user: state.user,
    app: state.app,
  };
};

// map dispatch to props

export default connect(mapStateToProps, {...RecActions, setAppData, signOut})(QueueContainer);
