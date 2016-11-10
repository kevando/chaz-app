import React from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import Home from './Home';
import Routes from '../../config/routes';


export default createContainer((props) => {
  const handle = Meteor.subscribe('recs-list',Meteor.userId());
  const recrsHandle = Meteor.subscribe('recrs-list',Meteor.userId());
  const {navigator} = props;


  const getQueue = (category) => {
    return (
      Meteor.collection('recs').find({category, grade: {$exists: false}, recr_id: {$exists: true} })
    )
  }
  const getRecs = (category) => {
    return (
      Meteor.collection('recs').find({category, recr_id: {$exists: true} })
    )
  }


  return {
    dataReady: handle.ready(),
    onAddRecPress: () => navigator.push(Routes.getRecInputRoute()),
    widgetData:  {

      // ONBOARDING

      onboarding: {
        recs: Meteor.collection('recs').find(),
        recrs: Meteor.collection('recrs').find(),
        navigator, // in case users can do things from the onboard widget
      },

      // RECENT RECS

      recent: {
        recs: Meteor.collection('recs').find({}, {sort: {createdAt: -1}} ),
        onRecPress: (rec) => navigator.push(Routes.getRecRoute(rec)),
        onRecrPress: (rec) => navigator.push(Routes.getRecrInputRoute(rec)),
        onCategoryPress: (rec) => navigator.push(Routes.getEditCategoryRoute(rec)),
      },

      // CATEGORIES

      categories: {
        recs: Meteor.collection('recs').find({}, {sort: {createdAt: -1}} ),
        onPress: (category) => navigator.push(Routes.getQueueRoute(category)),

      },

      // ALL RECS

      all: {
        recs: Meteor.collection('recs').find(),
        onPress: () => navigator.push(Routes.getQueueRoute()),
      },

      // HELP

      help: {
        // recs: Meteor.collection('recs').find(),
        // recrs: Meteor.collection('recrs').find(),
      },
    }
  };
}, Home);
