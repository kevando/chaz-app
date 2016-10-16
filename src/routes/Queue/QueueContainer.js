import React, { PropTypes } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import Queue from './Queue';
import Routes from '../../config/routes';


export default createContainer((props) => {

  const handle = Meteor.subscribe('recs-list',Meteor.userId());
  const { category } = props;

  var selector = (category ? {category, grade: {$exists: false}, recr_id: {$exists: true} } : {});

  var overallSorter = "rec.recr.score."+"overall";
  var categorySorter = "rec.recr.score."+category;

  return {
    recsReady: handle.ready(),
    category,
    onRecPress: (rec) => props.navigator.push(Routes.getRecRoute(rec)),
    recs: {
      newest: Meteor.collection('recs').find(selector,{sort: {createdAt: -1}}),
      oldest: Meteor.collection('recs').find(selector,{sort: {createdAt: 1}}),
      bestOverall: Meteor.collection('recs').find(selector,{sort: {overallSorter: -1}}),
      bestCategory: Meteor.collection('recs').find(selector,{sort: {categorySorter: -1}}),
    }

  };
}, Queue);
