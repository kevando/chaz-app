import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DebugContainer from './DebugContainer';

const mapStateToProps = (state) => {
  return {
    recommendations: state.recommendations.list,
  };
};

export default connect(mapStateToProps, null)(DebugContainer);
