import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DashboardContainer from './DashboardContainer';

import * as AppActions from '../../reducers/app/actions';
import * as RecActions from '../../reducers/recommendations/actions';

const mapStateToProps = (state) => {
  return {
    recommendations: state.recommendations.list,
    app: state.app,
  };
};

// map dispatch to props

export default connect(mapStateToProps, {...AppActions, ...RecActions})(DashboardContainer);
