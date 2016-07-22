import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Emoji from 'react-native-emoji'
export default class FilterRow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var filter = this.props.filter;
    return (
        <View style={styles.filterRow}>
          {this.renderFilterItems()}
        </View>
    );
  }

  renderFilterItems() { // this should probly be its own component
    var options = this.props.filter.get('options');
    console.log(options)
    var queries = this.props.filter.get('queries');
    console.log(queries)
    var filter = this.props.filter;
    var filterName = filter.get('name');

    return options.map((option,index) => {

      var isActive = (filter.get('active') == option ? styles.active : null);
      return (
        <TouchableOpacity key={index} onPress={this.props.onPress.bind(this,filterName,option)} >
          <Text style={[styles.option,isActive]}>{option}</Text>
          </TouchableOpacity>
       );
    })

  }
}

const styles = StyleSheet.create({
  filtersContainer: {
    backgroundColor:'#ccc',
    height:100,
    // flex:1,
    // flexDirection:'column',
    // alignItems:'center',
    // justifyContent:'center'
  },
  filterRow: { // makes it horizontal despite multiple text elemnts
    flex:1,
    flexDirection:'row',
    margin:5,
  },
  filterContainer: {
    borderWidth: 2,
    borderColor: '#555'
  },
  option: {
    color: 'red'
  },
  active: {
    color:'blue'
  }

})
