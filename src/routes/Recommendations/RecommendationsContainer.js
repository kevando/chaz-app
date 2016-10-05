import React, { PropTypes } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import Recommendations from './Recommendations';
import Routes from '../../config/routes';

const RecommendationsContainer = ({ detailsReady }) => {
  return (
    <Recommendations
      detailsReady={detailsReady}

    />
  );
};

RecommendationsContainer.propTypes = {
  detailsReady: PropTypes.bool,
  onRecPress: PropTypes.func,
  navigator: React.PropTypes.object,
};

export default createContainer((props) => {
  const handle = Meteor.subscribe('recs-list',Meteor.userId());

  return {
    detailsReady: handle.ready(),
    onRecPress: (rec) => props.navigator.push(Routes.getRecommendationRoute(rec))
  };
}, Recommendations);
