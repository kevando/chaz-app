'use strict';
const React = require('react-native');
const styles= require('../styles/styles.js');
const RecListItem = require('./RecListItem');
const constants = styles.constants;
const { StyleSheet, Component, Text, View, TouchableHighlight,ScrollView } = React;

class RecrView extends Component {


  constructor(props) {
    super(props);
    this.renderRecList = this.renderRecList.bind(this);
  }

  renderRecList() {
    console.log('thisprops recs',this.props.recr.recs)
    // _.forOwn(this.props.recr.recs, function(value, key) {
    //   console.log('dude')
    // });
    // const Recs = this.props.recr.recs.map((rec) => {

    var Recs = Array();
    _.forOwn(this.props.recr.recs, function(rec, key) {
      Recs.push(<RecListItem key={rec._key} rec={rec} recrs={this.props.state.recrs} />)

    });
    console.log('Recs',Recs)
    return Recs;
  }


  render() {
      return (
        <View style={styles.listContainer}>
          <ScrollView style={styles.listview} >

            {this.renderRecList()}
          </ScrollView>

        </View>
      );
    }
  }
  module.exports = RecrView;
