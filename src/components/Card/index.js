import React, { Component } from 'react';
import { Text, View, TouchableOpacity, LayoutAnimation } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

import styles from './styles';
import SetReminder from '../../components/SetReminder';

const RecIcon = (props) => {
  const {status, grade, reminder} = props.rec;
  var icon = 'square-o';
  var color = 'green';
  // if(status == 'unfinished')  icon = '🗣';
  // if(status == 'new')         icon = '📃';
  // if(reminder)                icon = '⏰';
  // if(grade === 1)             icon = '👍';
  // if(grade === -1)            icon = '👎';

  return <Icon name={icon} size={18} color={color} />
}
class Card extends Component {

  state = { expanded: true }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut(); // this animates the expanded/collapse
  }

  toggleExpanded() {
    this.setState({expanded: !this.state.expanded})
  }


  // const swipeButtons = {
  //   right: [
  //     {
  //       text: 'DELETE',
  //       backgroundColor: 'red',
  //       onPress: () => deleteRecommendation(rec.id),
  //     },
  //   ],
  //   left: [
  //     {
  //       text: ' 👍 ',
  //       backgroundColor: 'blue',
  //       onPress: () => {
  //         setStatus(rec.id, 'finished')
  //         setGrade(rec.id,1)
  //       },
  //     },
  //     {
  //       text: ' 👎 ',
  //       backgroundColor: 'red',
  //       onPress: () => {
  //         setStatus(rec.id, 'finished')
  //         setGrade(rec.id,-1)
  //       },
  //     }
  //   ]
  // }
  isCardExpanded() {
    if(this.state.expanded)
      return styles.expanded
  }

render() {
  const { rec, setStatus, setGrade, setReminder, deleteRecommendation, notificationPermission } = this.props;
  return (
    <TouchableOpacity onPress={this.toggleExpanded.bind(this)} activeOpacity={0.9}>
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




      </View>
    </TouchableOpacity>
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
