import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

// Might need to make this a container
import ListItem from './RecrListItem';
import EmptyMessage from './EmptyMessage';


export default class RecrList extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    var recrs = this.props.recrs;

    return (
      <View>
        {
          recrs.map(recr => (
             <ListItem key={recr.get('id')} recr={recr.toJS()} />
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
