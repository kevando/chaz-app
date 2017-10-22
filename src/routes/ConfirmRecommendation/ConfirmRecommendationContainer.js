import React, { Component } from 'react';
import ConfirmRecommendation from './ConfirmRecommendation';
import { Actions } from 'react-native-router-flux';

class ConfirmRecommendationContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {showTitle: true}
  }

  componentWillMount() {
    if(!this.props.unfinished.title) {
      this.setState({showTitle: false});
    }
  }
  componentDidMount() {
    // Not sure why this entire component re mounts..
    if(!this.props.unfinished.title) {
      Actions.reset('MainStack')
    }
  }

  _onSaveRecommendationPress() {
    const { addRecommendation, unfinished } = this.props;
    this.setState({showTitle: false});
    addRecommendation(unfinished); // Redux
  }

  render() {

    return (
      <ConfirmRecommendation
        onSaveRecommendationPress={this._onSaveRecommendationPress.bind(this)}
        {...this.props}
        {...this.state}
      />
    );
  }

}

export default ConfirmRecommendationContainer;
