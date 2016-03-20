'use strict';
var React = require('react-native');
const styles = require('../styles/styles.js')
const { View, TouchableHighlight, Text, AlertIOS } = React;
class ListItem extends React.Component {

  constructor(props) {
    super(props);

    this.onAddHumanPress = this.onAddHumanPress.bind(this);
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
  render() {

    const rec = this.props.rec;
    // console.log('render listitem',rec);
    return (
      <TouchableHighlight onPress={this.props.onPress}>
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
            ? <Text style={styles.liTextRight}>{rec.recr.name}</Text>
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
module.exports = ListItem;
