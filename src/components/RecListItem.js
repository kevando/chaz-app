import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {Actions} from "react-native-router-flux";
import Emoji from 'react-native-emoji';

// import RecGrade from './RecGrade';
import RecDate from './RecDate';
// import AddRecr from '../../containers/rec/AddRecr';
import RecType from './RecType';
import GlobalStyle from '../style/Global';
import {colors} from '../style/Global';
export default class ListItem extends Component {

  constructor(props) {
    super(props);
  }
  render() {

    var rec = this.props.rec;

    return (
      <TouchableOpacity onPress={this.onItemPress.bind(this)}>
        <View style={styles.card}>
          <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <View style={{flex:1,backgroundColor:'#fff'}}><RecType rec={rec} size={30} /></View>
            <View style={{flex:6,backgroundColor:'#fff'}}><Text style={{fontWeight:'600',fontSize:17}}>{rec.title}</Text></View>
            <View style={{flex:2,backgroundColor:'#fff'}}><Text style={{fontWeight:'600',fontSize:12,textAlign:'right'}}>{this.renderGrade(rec.grade)}</Text></View>
          </View>
        {this.renderRecNote(rec.note)}
        {this.renderRecr(rec.recr)}
        <RecDate timestamp={rec.created_at} />

        </View>

      </TouchableOpacity>
    );
  }

  onItemPress() {
    Actions.recommendation({rec: this.props.rec});
  }

  renderRecNote(note) { // dont give spacing for note if its not there
    if(note)
    return(<Text style={{fontWeight:'400',fontSize:16,color:'#555',height:20,margin:5}} >{note}</Text>);
  }
  renderGrade(grade) { // dont give spacing for note if its not there
    if(grade)
    return grade + " Stars";
  }

  renderRecr(recr) {
    if(recr)
      return(<Text style={{fontWeight:'500',fontSize:15,color:'#333',marginLeft:3}}><Emoji name="slightly_smiling_face" /> Recommended by {recr.name} {recr.score}</Text>);
  }


}


const styles = StyleSheet.create({
  card: {
    marginTop:3,
    marginBottom:3,
    padding:5,
    borderBottomWidth:1,
    borderBottomColor:colors.grey,
    borderTopWidth:1,
    borderTopColor:colors.grey,
    backgroundColor:"#fff"
  }


  // row: {
  //   backgroundColor: 'red',
  //   borderBottomWidth:1,
  //   borderBottomColor: '#ddd',
  //   flexDirection: 'column', // inner rows on top of each other
  //   paddingTop:5,
  //   paddingBottom:5,
  //   paddingLeft:5,
  //   paddingRight:5
  // },
  //
  //
  // left: {
  //   flex:2,
  //   justifyContent: 'center', // vertical middle
  //   flexDirection: 'column',
  //   backgroundColor: 'red'
  // },
  // right: {
  //   flex:14,
  //   justifyContent: 'center', // vertical middle
  //   flexDirection: 'column',
  //   backgroundColor:'#fff',
  //   paddingLeft:5
  // },
  // title: {
  //   textAlign: 'left',
  //   fontSize: 16,
  //   fontWeight: '400',
  //   letterSpacing:1.1
  // },
  // note: {
  //   textAlign: 'left',
  //   fontSize: 13,
  //   fontWeight: '300',
  //   color: "#666",
  //   letterSpacing:1.0,
  //   marginTop:5
  // }

});
