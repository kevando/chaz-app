import React, { Component, PropTypes } from 'react';
import Categories from './Categories';
import {connect} from 'react-redux';
import {ListView} from 'react-native'; // should this be here?
import Routes from '../../config/routes';

class CategoriesContainer extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.props.categories.toJS()),
    };
  }

  render(){
    return (
      <Categories
        dataSource={this.state.dataSource}
        onPress= { (category) => this.props.navigator.push(Routes.getRecsRoute(category)) }
        />
    );
  }
}


function mapStateToProps(state) {
  return {
    categories: state.categories,
  };
}

export default connect(mapStateToProps)(CategoriesContainer);
