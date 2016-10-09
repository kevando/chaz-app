import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
// import * as categoriesActions from '../reducers/categories/actions';
import FilterItem from '../components/FilterItem';
import * as Global from '../style/Global';
import {colors} from '../style/Global';

class FilterNav extends Component {
  constructor(props) {
    super(props);
    this.state = {activeFilter: 'all'};
  }

  render() {

    var rec = this.props.rec;

    return (
      <ScrollView horizontal={true} >
        <View style={styles.filtersContainer} >
          <View style={styles.filterRow}>
            {this.renderFilters()}
          </View>
        </View>
      </ScrollView>
    )
  }

  onFilterPress(filter){
    // this.props.dispatch(categoriesActions.setFilter(filter));
    this.setState({activeFilter:filter.id});
  }

  renderFilters() {
    var onPress = this.onFilterPress;

    var filterList = this.props.categories;
    var activeFilter = this.state.activeFilter;//'all';//this.props.app.get('activeFilter');

    var renderedFilterList = Array()
    // need to do it like this cause returning a map is some experimental feature
    // todo change this render fn, no longer need to map like this

    filterList.map((filter) => {
      // console.log('filter to render',filter);
      renderedFilterList.push(
        <FilterItem
          filter={filter}
          key={filter.label}
          style={styles.filterItem}
          activeFilter={activeFilter}
          onPress={this.onFilterPress.bind(this,filter)}
        />
      )
    });

    return renderedFilterList;
  }

}

const styles = StyleSheet.create({
  filtersContainer: {
    borderTopWidth:1,
    borderTopColor: "#ccc",//GlobalStyle.constants.colors[1],
  },
  filterRow: { // makes it horizontal despite multiple text elemnts
    flex:1,
    flexDirection:'row',
    alignItems:'stretch',
    margin:0,
  },

})

function mapStateToProps(state) {
  return {
    app: state.app, // depending how I do this. I probably only need onboarding here
    categories: state.categories
  }
}

export default connect(mapStateToProps)(FilterNav);
