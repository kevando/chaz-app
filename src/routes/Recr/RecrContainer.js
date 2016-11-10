import React, { PropTypes } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import Recr from './Recr';
import Routes from '../../config/routes';


export default createContainer((props) => {

  const handle = Meteor.subscribe('recs-list',Meteor.userId());
  const { recr, navigator } = props;

  return {
    recsReady: handle.ready(),
    recr,
    onRecPress: (rec) => props.navigator.push(Routes.getRecRoute(rec)),
    recs: Meteor.collection('recs').find({recr_id: recr._id})
  };
}, Recr);
