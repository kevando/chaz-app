import React, { PropTypes } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import Recommendation from './Recommendation';

const RecommendationContainer = ({ rec }) => {
  return (
    <Recommendation
      rec={rec}
    />
  );
};

RecommendationContainer.propTypes = {
  rec: PropTypes.object,
};

export default RecommendationContainer;
