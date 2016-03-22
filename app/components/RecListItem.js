'use strict';
var React = require('react-native');
var _ = require('lodash');
const styles = require('../styles/styles.js');
const RecrView = require('./RecrView');
const { View, TouchableHighlight, Text, AlertIOS } = React;

class RecListItem extends React.Component {

  constructor(props) {
    super(props);
    this.onAddHumanPress = this.onAddHumanPress.bind(this);
    this.onRecrPress = this.onRecrPress.bind(this);
  }

  onAddHumanPress() {
    var options = Array();
    options.push({text: 'Add New',  onPress: (recr) => {this.props.createNewRecrFunction(recr,this.props.rec)}    });
    var recrs = this.props.recrs.map((recr) => {
      options.push({text: recr.name, onPress: () => {this.props.assignExistingRecrFunction(recr,this.props.rec)} });
    });
    options.push({text: 'Cancel', onPress: (text) => console.log('action canelled') });

    AlertIOS.prompt('Who recommended this?', null, options);
  }
  onRecrPress() {
    const recrs = this.props.recrs;
    var recr = this.props.rec.recr;
    var recr = _.find(recrs, ['_key', recr._key]);
    // console.log('calculated recr',recr)
    var nav = this.props.navigator;
    nav.push({
      title: recr.name,
      passProps: { recr: recr },
      component: RecrView,
    })
  }
  render() {

    const rec = this.props.rec;
    var onPress = this.props.onPress;
    if(rec.recr == null)
      onPress = this.onAddHumanPress

    return (
      <TouchableHighlight onPress={onPress}>

        <View style={styles.li}>
          <View style={styles.liLeft}>
            <Text style={styles.recListItemRecTitle}>{rec.title}</Text>
            {( rec.grade != null
              ? <Text style={styles.recListItemRecGradeMissing}>{rec.grade} Stars</Text>
              : <Text style={styles.recListItemRecGradeMissing}>No Grade</Text>
            )}
          </View>
          <View style={styles.liRight}>
          {( rec.recr != null
            ? <TouchableHighlight onPress={this.onRecrPress}>
                <Text style={styles.liTextRight}>{rec.recr.name}</Text>
              </TouchableHighlight>

            : <TouchableHighlight onPress={this.onAddHumanPress}>
                <Text style={styles.recListItemRecHumanMissing}>+ Recommender</Text>
              </TouchableHighlight>
          )}
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}
module.exports = RecListItem;
