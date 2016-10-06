import React, { PropTypes } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import Rec from './Rec';

const RecContainer = ({ rec }) => {
  return (
    <Rec
      rec={rec}
    />
  );
};

RecContainer.propTypes = {
  rec: PropTypes.object,
};

export default RecContainer;
