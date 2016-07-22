import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

// Might need to make this a container
import ListItem from './ListItem';

export default class RecList extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    // possible handler for an empty RecList
    return (
      <View>
        {this.renderRecList()}
      </View>
    );
  }

  renderRecList(onAddRecrPress) {
    // Rec List is now passed in via props
    var recList = this.props.recList;

    var recs = recList.map((Rec) => {
      var rec = Rec.toJS();
      return (<ListItem key={rec._key} rec={rec} navigator={this.props.navigator} />)
    });
    return recs;
  }
}

const styles = StyleSheet.create({
  recListItemRecGrade: {
    fontSize:11,
    paddingTop:3
  },

});
