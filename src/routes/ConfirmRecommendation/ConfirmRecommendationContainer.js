import React, { Component } from 'react';
import Button from '../../components/Button';

import ConfirmRecommendation from './ConfirmRecommendation';
import Routes from '../../config/routes';

class ConfirmRecommendationContainer extends Component {

  constructor(props) {
    super(props);
    // this.state = {name: 'friend'}
  }

  saveRecommendation() {
    const { navigator, saveRecommendation } = this.props;
    saveRecommendation(); // Redux

    navigator.resetTo(Routes.getDashboardRoute());
  }

  render() {
    return (
      <ConfirmRecommendation
        onSaveRecommendationPress={this.saveRecommendation.bind(this)}
        {...this.props}
      />
    );
  }

}

export default ConfirmRecommendationContainer;
