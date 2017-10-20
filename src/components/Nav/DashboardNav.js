import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

import { colors } from '../../config/styles';

class DashboardNav extends Component {

  state = { selected: 'all' }

  _onOptionPress(option) {
    this.props.setFilter(option)
    this.setState({selected:option})
  }

  _getOptionStyle(option) {

    if(option == this.state.selected)
      return {backgroundColor: '#fff', color: colors.purple}
  }
  //
  render() {
    const { title, navigator } = this.props;
    const { selected } = this.state;
    return (
      <View style={styles.titleContainer}>
       <Icon name="heart" size={25} color={colors.yellow} style={{paddingHorizontal:3}}/>
        <Text style={styles.title}>chaz</Text>


      </View>
    );
  }
  render_options() {
    const { title, navigator } = this.props;
    const { selected } = this.state;
    return (
      <View style={styles.optionsContainer}>

      <TouchableOpacity onPress={ this._onOptionPress.bind(this,'all') } activeOpacity={0.9}>
          <Text style={[styles.optionText,this._getOptionStyle('all')]}>All</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={ this._onOptionPress.bind(this,'queue') } activeOpacity={0.9}>
        <Text style={[styles.optionText,this._getOptionStyle('queue')]}>Queue</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={ this._onOptionPress.bind(this,'finished') } activeOpacity={0.9}>
        <Text style={[styles.optionText,this._getOptionStyle('finished')]}>Done</Text>
      </TouchableOpacity>


      </View>
    );
  }

};

// export default DashboardNav;


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from '../../reducers/app/actions';
import * as RecActions from '../../reducers/recommendations/actions';

const mapStateToProps = (state) => {
  return {
    recommendations: state.recommendations.list,
    app: state.app,
  };
};

// map dispatch to props

export default connect(mapStateToProps, {...AppActions, ...RecActions})(DashboardNav);
