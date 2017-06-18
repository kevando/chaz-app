import React, { Component } from 'react';
import { Text, View, TouchableOpacity, LayoutAnimation, AlertIOS } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import { colors } from '../../config/styles';
import styles from './styles';
import SetReminder from '../../components/SetReminder';
import Tooltip from '../../components/Tooltip';

const RecIcon = (props) => {
  const {status, grade, reminder} = props.rec;
  var icon = 'file-text-o';
  var color = colors.grey;
  // if(status == 'unfinished')  icon = '🗣';
  // if(status == 'new')         icon = '📃';
  if(reminder)                icon = 'clock-o';
  // if(grade === 1)             icon = '👍';
  // if(grade === -1)            icon = '👎';

  return <Icon name={icon} size={25} color={color} />
}
class Card extends Component {

  state = { expanded: false }

  componentWillUpdate() {
    // this.setState({expanded: false})
    LayoutAnimation.easeInEaseOut(); // this animates the expanded/collapse

  }

  _toggleExpanded() {
    if(this.props.unfinished) return; // dont allow expand if rec isnt saved
    this.setState({expanded: !this.state.expanded})
  }

  _onDeletePress() {
    AlertIOS.alert(
      'Delete Forever?',
      'There is no coming back',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
        {text: 'Delete', onPress: () => this.props.deleteRecommendation(this.props.rec.id) ,style:'destructive'},
      ],
    );
  }

  isCardExpanded() {
    if(this.state.expanded)
      return styles.expanded
  }

render() {
  const { rec, setStatus, setGrade, setReminder, notificationPermission, totalRecs } = this.props;
  return (
    <View>
    <TouchableOpacity onPress={this._toggleExpanded.bind(this)} activeOpacity={0.9}>
      <View style={[styles.container,this.isCardExpanded()]}>

        <View style={styles.iconContainer}>
          <RecIcon rec={rec} />
        </View>

        <View style={styles.textContainer}>

          <View style={styles.recContainer}>
            <Text style={styles.recText}>{rec.title}</Text>
          </View>

          <View style={styles.friendContainer}>
            <Text style={styles.friendText}>Recommended by <Text style={styles.bold}>{rec.friend}</Text></Text>
          </View>

          {this.state.expanded &&
            <View>

              <Text style={styles.friendText}>Saved {rec.status != 'unfinished' && moment(rec.createdAt).fromNow() }</Text>


              <SetReminder {...this.props} />

            </View>

          }




        </View>


        <View style={styles.deleteContainer}>
        { this.state.expanded &&
          <TouchableOpacity onPress={this._onDeletePress.bind(this)} activeOpacity={0.9}>
            <Icon name="times" size={20} color={colors.red} style={{opacity:0.9}} />
          </TouchableOpacity>
        }
        </View>

      </View>
    </TouchableOpacity>
    <View>
    {totalRecs == 1 && !this.state.expanded &&
    <Tooltip text="^ Tap to expand" />
    }

    {totalRecs == 1 && this.state.expanded && !rec.reminder && notificationPermission != 'authorized' &&
    <Tooltip text="^ Tap to enable permission" />
    }

    {totalRecs == 1 && this.state.expanded && !rec.reminder && notificationPermission == 'authorized' &&
    <Tooltip text="^ Tap to set a reminder" />
    }

    {totalRecs == 1 && this.state.expanded && rec.reminder &&
    <Tooltip text="^ Tap to collapase" />
    }
    </View>

    </View>
  );
}


};

Card.propTypes = {
  rec: React.PropTypes.object,
  // friend: React.PropTypes.string,
  onPress: React.PropTypes.func,
};

Card.defaultProps = {
  rec: {title: 'DUMMY', friend: 'duude'},
  onPress: () => console.log('Button Pressed'),
};

export default Card;


// <View style={styles.dateContainer}>
//   <Text style={styles.dateText}>{moment(rec.createdAt).fromNow() }</Text>
// </View>


// left: [
//     {
//       text: ' 👍 ',
//       backgroundColor: 'blue',
//       onPress: () => {
//         setStatus(rec.id, 'finished')
//         setGrade(rec.id,1)
//       },
//     },
