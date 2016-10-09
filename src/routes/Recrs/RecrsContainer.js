  import React, { PropTypes } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import Recrs from './Recrs';
import Routes from '../../config/routes';



export default createContainer((props) => {
  const handle = Meteor.subscribe('recrs-list',Meteor.userId());

  return {
    recrsReady: handle.ready(),
    onRecrPress: (recr) => console.log('recr pressed'),
  };
}, Recrs);
