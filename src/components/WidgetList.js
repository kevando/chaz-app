import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';


import Friends from './Widgets/Friends';
import Uncategorized from './Widgets/Uncategorized';

const Widgets = {
  Friends: Friends,
  Uncategorized: Uncategorized
}

import { connect } from 'react-redux';

class WidgetList extends Component {

  render() {

    return (
      <View>
        {this.renderWidgets()}
      </View>
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
          <Widget />
        </View>

      );
    });

  }
}

const styles = StyleSheet.create({
  container: {
    borderColor:'#666',
    borderWidth:1,
    margin:10,
    padding: 5

  },
  label: {
    backgroundColor:'#fff',
    fontSize:16,
    
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
