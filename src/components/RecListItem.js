import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {Actions} from "react-native-router-flux";

// import RecGrade from './RecGrade';
import RecDate from './RecDate';
// import AddRecr from '../../containers/rec/AddRecr';
import RecType from './RecType';
import GlobalStyle from '../style/Global';
export default class ListItem extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    // removing add recr until 0.8
    // {this.renderRecrDisplay()}

    var rec = this.props.rec;

    return (
      <TouchableOpacity onPress={this.onItemPress.bind(this)}>
      <View style={{padding:10,borderBottomWidth:1,borderBottomColor:'#ccc'}}>
        <View style={{flex:1,flexDirection:'row'}}>
          <View style={{flex:1}}><RecType rec={rec} size={30} /></View>
          <View style={{flex:7}}><Text style={{fontWeight:'600',fontSize:20}}>{rec.title}</Text></View>
        </View>
        <Text style={{fontWeight:'400',fontSize:15,color:'#ccc'}}>{rec.note}</Text>

        <Text style={{fontWeight:'500',fontSize:15,color:'#333'}}>{this.renderRecr()}</Text>
        <RecDate timestamp={rec.created_at} />

        </View>

      </TouchableOpacity>
    );
  }

  onItemPress() {

    Actions.recommendation({rec: this.props.rec});
  }
  render_og() {
    // // removing add recr until 0.8
    // // {this.renderRecrDisplay()}
    //
    // var rec = this.props.rec;
    //
    // return (
    //   <TouchableOpacity onPress={ this.onRecPress.bind(this) }>
    //
    //     <View style={styles.row} >
    //
    //       <View style={styles.innerRowTop}>
    //         <View style={styles.left} >
    //           <RecType type={rec.type} size={30} />
    //         </View>
    //         <View style={styles.right} >
    //           <Text style={styles.title} >{rec.title}</Text>
    //           { this.renderRecNote() }
    //           { this.renderRecr() }
    //         </View>
    //       </View>
    //
    //       <View style={styles.innerRowBottom}>
    //         <RecDate timestamp={rec.createdAt} />
    //       </View>
    //
    //     </View>
    //
    //   </TouchableOpacity>
    // );
  }

  renderRecNote() { // dont give spacing for note if its not there
    if(this.props.rec.note)
    return(<Text style={styles.note}>{this.props.rec.note}</Text>);
  }

  renderRecr() {
    if(this.props.rec.recr)
      return(<Text style={styles.recr}>Recommended by {this.props.rec.recr.name}</Text>);
  }

  onRecPress() {
    var recKey = this.props.rec._key;

    // passed in via props, not redux.
    this.props.navigator.push({
      title: "Recommendation",
      screen: "chaz.RecViewScreen",
      backButtonTitle: 'Back',
      passProps: { recKey }
    });
  }

}


const styles = StyleSheet.create({
  row: {
    backgroundColor: 'white',
    borderBottomWidth:1,
    borderBottomColor: '#ddd',
    flexDirection: 'column', // inner rows on top of each other
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:5,
    paddingRight:5
  },
  innerRowTop: {
    backgroundColor:'#fff',
    flexDirection: 'row',
    flex:1,
  },
  innerRowBottom: {
    backgroundColor:'#fff',
    flexDirection: 'row',
    flex:1,
    paddingLeft: 10, // trying to align w emoji
    paddingTop: 7, // Swarm did this, so I am too
  },
  left: {
    flex:2,
    justifyContent: 'center', // vertical middle
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  right: {
    flex:14,
    justifyContent: 'center', // vertical middle
    flexDirection: 'column',
    backgroundColor:'#fff',
    paddingLeft:5
  },
  title: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing:1.1
  },
  note: {
    textAlign: 'left',
    fontSize: 13,
    fontWeight: '300',
    color: "#666",
    letterSpacing:1.0,
    marginTop:5
  }

});
