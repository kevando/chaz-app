import React, { PropTypes } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import Rec from './Rec';
import Routes from '../../config/routes';

const RecContainer = ({ rec, navigator }) => {
  return (
    <Rec
      rec={rec}
      onRecEditPress={() => navigator.push(Routes.getRecInputRoute(rec))}
    />
  );
};

RecContainer.propTypes = {
  rec: PropTypes.object,
};

export default RecContainer;
