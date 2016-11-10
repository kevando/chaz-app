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

      // MISSING REC DATA

      needsData: {
        recs: Meteor.collection('recs').find({$or: [{category:'uncategorized'},{recr_id: null}] }, {sort: {createdAt: -1}} ),
        // recs: Meteor.collection('recs').find(),
        onRecrPress: (rec) => navigator.push(Routes.getRecrInputRoute(rec)),
        onCategoryPress: (rec) => navigator.push(Routes.getEditCategoryRoute(rec)),
      },

      // TV SHOWS

      tv: {
        recs: {queue: getQueue('tv'), all: getRecs('tv') },
        onRecPress: (rec) => navigator.push(Routes.getRecRoute(rec))
      },


      uncategorized: { recs: Meteor.collection('recs').find({category:'uncategorized'}), onPress: (rec) => navigator.push(Routes.getEditCategoryRoute(rec)) },
      needsRecr: { recs: Meteor.collection('recs').find({recr_id:null}), onPress: (rec) => navigator.push(Routes.getRecrInputRoute(rec)) },

      bookQueue: { recs: getQueue('book'), onPress: () => navigator.push(Routes.getQueueRoute('book')) },
      musicQueue: { recs: getQueue('music'), onPress: () => navigator.push(Routes.getQueueRoute('music')) },
      podcastQueue: { recs: getQueue('podcast'), onPress: () => navigator.push(Routes.getQueueRoute('podcast')) },
      foodQueue: { recs: getQueue('food'), onPress: () => navigator.push(Routes.getQueueRoute('food')) },
      placeQueue: { recs: getQueue('place'), onPress: () => navigator.push(Routes.getQueueRoute('place')) },

      topFriends: { recrs: Meteor.collection('recrs').find(), onPress: (recr) => navigator.push(Routes.getRecrRoute(recr)) },



      movieQueue: { recs: getQueue('movie'), onPress: () => navigator.push(Routes.getQueueRoute('movie')) },


      queue: { recs: Meteor.collection('recs').find(), onPress: () => navigator.push(Routes.getRecsRoute()) },

      help: { recs: Meteor.collection('recs').find(), recrs: Meteor.collection('recrs').find(),  },
    }
  };
}, Home);
