import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Chaz from './Chaz';
import * as Actions from '../../reducers/app/actions';

const mapStateToProps = (state) => {
  return {
    app: state.app,
    isAuthenticated: state.app.isAuthenticated,
    // user: state.user, // when this shit changes, chaz.js rerenders the whole shabang
    showOnboarding: false,//state.recommendations.myRecs.length == 0,
    // unfinished: state.recommendations.unfinished,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Chaz);
