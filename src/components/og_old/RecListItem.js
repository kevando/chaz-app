import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {Actions} from "react-native-router-flux";
import Emoji from 'react-native-emoji';

import RecGrade from './RecGrade';
import RecDate from './RecDate';
// import AddRecr from '../../containers/rec/AddRecr';
import RecType from './RecType';
import {colors} from '../style/Global';
export default class ListItem extends Component {

  constructor(props) {
    super(props);
  }
  render() {

    var rec = this.props.rec;
    // console.log('rec',rec)

    return (
      <TouchableOpacity onPress={this.onItemPress.bind(this)}>
        <View style={styles.card}>
          <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <View style={{flex:1,backgroundColor:'#fff'}}><RecType rec={rec} size={30} /></View>
            <View style={{flex:6,backgroundColor:'#fff'}}>
              <Text style={{fontWeight:'600',fontSize:17}}>{rec.title}</Text>
              {this.renderGrade(rec.grade)}
            </View>
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
    if(grade != null)
      return (<RecGrade size={10} grade={grade} />);
  }

  renderRecr(recr) {
    if(recr)
      return(<Text style={{fontWeight:'400',fontSize:14,color:colors.grey,marginLeft:3}}><Emoji name="slightly_smiling_face" /> Recommended by <Text style={{fontWeight:'600',fontSize:16,color:colors.green,marginLeft:3}}>{recr.name} </Text></Text>);
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

});
