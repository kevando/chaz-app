import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DashboardContainer from './DashboardContainer';

import * as Actions from '../../reducers/app/actions';

const mapStateToProps = (state) => {
  return {
    recommendations: state.recommendations.list,
    app: state.app,
  };
};

// map dispatch to props

export default connect(mapStateToProps, Actions)(DashboardContainer);
