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
    AlertIOS.prompt(
      'Who recommended this?',
      null,
      [
        {text: 'Cancel', onPress: (text) => console.log('Cancel')},
        {text: 'Add', onPress: (text) => {this.props.itemRef.update({recr: text})} },

      ],
    );
  }
  render() {

    const rec = this.props.item;
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
            ? <Text style={styles.liTextRight}>{rec.recr}</Text>
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
