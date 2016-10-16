import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView
} from 'react-native';


import Friends from './Widgets/Friends';
import Uncategorized from './Widgets/Uncategorized';
import NeedsRecr from './Widgets/NeedsRecr'
import Queue from './Widgets/Queue'

const Widgets = {
  Friends: Friends,
  Uncategorized: Uncategorized,
  NeedsRecr: NeedsRecr,
  Queue: Queue,
}

import { connect } from 'react-redux';

class WidgetList extends Component {

  render() {

    return (
      <ScrollView>
        {this.renderWidgets()}
      </ScrollView>
    );
  }

  renderWidgets() {
    let widgets = this.props.widgets;
    var sortedWidgets = widgets.sort(
      (a, b) => a.position > b.position
    );
    // console.log('widgets',widgets);

    return sortedWidgets.map(function(widget){

      var Widget = Widgets[widget.component];
      return(
        <View key={widget.label} style={styles.container} >
          <Text style={styles.label}>{widget.label}</Text>
          <View style={styles.widget}><Widget /></View>
        </View>

      );
    });

  }
}

const styles = StyleSheet.create({
  container: {
    borderColor:'#999',
    borderWidth:1,
    margin:10,
    padding: 5,
    backgroundColor: '#fff',

  },
  label: {
    backgroundColor:'#fff',
    fontSize:18,
    fontWeight:'700',
  },
  widget: {
    borderColor:'#ddd',
    borderWidth:1,
    backgroundColor:'#fffff0'
  }


})

function mapStateToProps(state) {
  return {
    widgets: state.widgets,
    // recrs: state.recrs,
    // app: state.app,
    // onboard: state.onboard

  };
}

export default connect(mapStateToProps)(WidgetList);
