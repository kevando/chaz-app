import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RecViewContainer from './RecViewContainer';
import * as RecActions from '../../reducers/recommendations/actions';

const mapStateToProps = (state) => {
  return {
    app: state.app,
  };
};

export default connect(mapStateToProps, {...RecActions})(RecViewContainer);
