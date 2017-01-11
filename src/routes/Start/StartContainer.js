import React, { Component } from 'react';

import Start from './Start';
import Routes from '../../config/routes';

class StartContainer extends Component {


  render() {

    const { navigator, recommendations} = this.props;

    return (
      <Start
        {...this.props}
        onNewRecPress={() => navigator.push(Routes.getNewRecommendationRoute())}
      />
      )

  }
}

export default StartContainer;
