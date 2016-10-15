import React from 'react';
import Meteor, { connectMeteor, createContainer } from 'react-native-meteor';
import Home from './Home';
import Routes from '../../config/routes';


export default createContainer((props) => {
  const handle = Meteor.subscribe('recs-list',Meteor.userId());
  const recrsHandle = Meteor.subscribe('recrs-list',Meteor.userId());
  const {navigator} = props;

  return {
    dataReady: handle.ready(),

    onAddRecPress: () => navigator.push(Routes.getRecInputRoute()),
    widgetData:  {
      uncategorized: { recs: Meteor.collection('recs').find({category:'uncategorized'}), onPress: () => navigator.push(Routes.getRecsRoute('uncategorized')) },
      needsRecr: { recs: Meteor.collection('recs').find({recr_id:null}), onPress: (rec) => navigator.push(Routes.getRecrInputRoute(rec)) },
      movieQueue: { recs: Meteor.collection('recs').find({category:'movie'}), onPress: () => navigator.push(Routes.getRecsRoute('movie')) },
      bookQueue: { recs: Meteor.collection('recs').find({category:'book'}), onPress: () => navigator.push(Routes.getRecsRoute('book')) },
      musicQueue: { recs: Meteor.collection('recs').find({category:'music'}), onPress: () => navigator.push(Routes.getRecsRoute('music')) },
      tvQueue: { recs: Meteor.collection('recs').find({category:'tv'}), onPress: () => navigator.push(Routes.getRecsRoute('tv')) },
      podcastQueue: { recs: Meteor.collection('recs').find({category:'podcast'}), onPress: () => navigator.push(Routes.getRecsRoute('podcast')) },
      foodQueue: { recs: Meteor.collection('recs').find({category:'food'}), onPress: () => navigator.push(Routes.getRecsRoute('food')) },
      placeQueue: { recs: Meteor.collection('recs').find({category:'place'}), onPress: () => navigator.push(Routes.getRecsRoute('place')) },
      queue: { recs: Meteor.collection('recs').find(), onPress: () => navigator.push(Routes.getRecsRoute()) },
      topFriends: { recrs: Meteor.collection('recrs').find(), onPress: (recr) => navigator.push(Routes.getRecrRoute(recr)) },
    }
  };
}, Home);
