import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

// Might need to make this a container
import ListItem from './RecListItem';

export default class RecList extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    var recs = this.props.recs;

    return (
      <View>
        {
          recs.map(rec => (
             <ListItem key={rec.get('id')} rec={rec.toJS()} />
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
