import React, { PropTypes } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import Queue from './Queue';
import Routes from '../../config/routes';


export default createContainer((props) => {

  const handle = Meteor.subscribe('recs-list',Meteor.userId());
  const { category } = props;

  var selector = (category ? {category} : {});

  var overallSorter = "recr_score."+"overall";
  var categorySorter = "recr_score."+category;

  return {
    recsReady: handle.ready(),
    onRecPress: (rec) => props.navigator.push(Routes.getRecRoute(rec)),
    recs: {
      newest: Meteor.collection('recs').find(selector,{sort: {createdAt: -1}}),
      oldest: Meteor.collection('recs').find(selector,{sort: {createdAt: 1}}),
      bestOverall: Meteor.collection('recs').find(selector,{sort: {overallSorter: -1}}),
      bestCategory: Meteor.collection('recs').find(selector,{sort: {categorySorter: -1}}),
    }

  };
}, Queue);
