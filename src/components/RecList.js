import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

// Might need to make this a container
import ListItem from './RecListItem';
import EmptyMessage from './EmptyMessage';
export default class RecList extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    var recs = this.props.recs;
    console.log(recs);
    if(recs.size == 0)
      return(<EmptyMessage instructions="There is nothing to show here."  />)
    return (
      <View>
        {
          recs.valueSeq().map(rec => (
             <ListItem key={rec._id} rec={rec} />
          ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  recListItemRecGrade: {
    fontSize:11,
    paddingTop:3
  },

});
