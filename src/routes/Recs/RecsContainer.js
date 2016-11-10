import React, { PropTypes } from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import Recs from './Recs';
import Routes from '../../config/routes';

// const RecsContainer = ({ detailsReady }) => {
//   return (
//     <Recommendations
//
//
//     />
//   );
// };
//
// RecsContainer.propTypes = {
//   recsReady: PropTypes.bool,
//   onRecPress: PropTypes.func,
//   navigator: React.PropTypes.object,
// };

export default createContainer((props) => {
  const handle = Meteor.subscribe('recs-list',Meteor.userId());

  var selector = {}
  if(props.category) selector = {category: props.category}

  var tempRecs = Meteor.collection('recs').find();
  console.log('tmp rtecs', tempRecs);

  return {
    recsReady: handle.ready(),
    onRecPress: (rec) => props.navigator.push(Routes.getRecRoute(rec)),
    selector: selector,
    recs: Meteor.collection('recs').find(selector),
  };
}, Recs);
