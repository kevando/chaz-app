import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';


export default class PopularRecrs extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    // possible handler for an empty RecList
    return (
      <View style={styles.recrContainer}>
        {this.renderExistingRecrs()}
      </View>
    );
  }

  renderExistingRecrs() {
    var recrList = Array()
    this.props.recrList.map((recr,recrKey) => {
      recrList.push(
        <TouchableOpacity style={styles.recrButton} key={recrKey} onPress={this.props.onPress.bind(this,recr)} >
          <Text style={styles.recrText}>{recr.get('name')}</Text>
        </TouchableOpacity>
      )
    });
    return recrList;
  }

}

const styles = StyleSheet.create({
  recrContainer: {
    // backgroundColor: 'yellow',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  recrButton: {
    borderWidth:2,
    borderColor:'green',
    margin: 5
  },
  recrText: {
    padding:5,
  }

});
