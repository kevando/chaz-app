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
          <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <View style={{flex:1}}><RecType rec={rec} size={30} /></View>
            <View style={{flex:6}}><Text style={{fontWeight:'600',fontSize:20}}>{rec.title}</Text></View>
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

  renderRecr(recr) {
    if(recr)
      return(<Text style={{fontWeight:'500',fontSize:15,color:'#333',marginLeft:3}}><Emoji name="slightly_smiling_face" /> Recommended by {recr.name}</Text>);
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


  left: {
    flex:2,
    justifyContent: 'center', // vertical middle
    flexDirection: 'column',
    backgroundColor: 'red'
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
