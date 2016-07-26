import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  AlertIOS
} from 'react-native';
import RecGrade from './RecGrade';
import RecDate from './RecDate';
import AddRecr from '../../containers/rec/AddRecr';
import RecType from './RecType';
import Style from '../../style/Style';
export default class ListItem extends Component {

  constructor(props) {
    super(props);
  }



  render() {

    var rec = this.props.rec;
    console.log('REC',rec)
    return (
      <TouchableOpacity style={styles.row} onPress={ this.onRecPress.bind(this) }>
        <View style={styles.left}>
          <RecType style={styles.recType} type={rec.type} />
        </View>
        <View style={styles.middle}>
          <Text style={styles.title} >{rec.title}</Text>
            {this.renderRecrDisplay()}
            {this.renderRecComment()}
        </View>
        <View style={styles.right}>
        <RecGrade grade={this.props.rec.grade} />
        <RecDate timestamp={rec.createdAt} />
        </View>
      </TouchableOpacity>
    );
  }

  renderRecComment() {
    if(this.props.rec.comment)
    return(<Text>{this.props.rec.comment}</Text>);
  }

  renderRecrDisplay() {

    const recr = this.props.rec.recr;
    if(recr){
      return (
        <View style={styles.recrTextContainer}>
          <View style={styles.recomendContainer}>
            <Text style={styles.recommended} >Recommended by </Text>
          </View>
          <View style={styles.recrTextContainer}>
            <TouchableOpacity style={styles.recrButton} onPress={ this.onRecrPress.bind(this) }>
              <Text style={styles.recrText} >{recr.name}</Text>
              </TouchableOpacity>
          </View>
        </View>

      )
    } else {
      return (
        <AddRecr rec={this.props.rec}/>
      );
    }
  }

  getRecrName() {
    if(this.props.rec.recr)
      return this.props.rec.recr.name
  }
  getRecrScore() {
    if(this.props.rec.recr)
      return this.props.rec.recrScore
  }

  onRecPress() {
    var rec = this.props.rec;
    var recKey = this.props.rec._key;

    // passed in via props, not redux. how can i make the view page auto refresh
    this.props.navigator.push({
      title: "",
      screen: "chaz.RecViewScreen",
      passProps: { currentRec: rec,recKey }
    });
  }

  onRecrPress() {
    this.props.navigator.push({
      title: "",
      screen: "chaz.RecrViewScreen",
      passProps: {recrKey:this.props.rec.recr._key }
    });
  }

}


const styles = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    borderBottomWidth:1,
    borderBottomColor: '#ddd',

    flexDirection: 'row',
    paddingTop:6,
    paddingBottom:20,
    paddingLeft:10,
    paddingRight:10
  },
  left: {
    flex:1,
    justifyContent: 'center', // vertical middle
    flexDirection: 'row'
  },
  middle: {
    flex:7,
  },
  right: {
    flex:3,
    justifyContent: 'flex-end', // vertical middle
    flexDirection: 'row',
    // backgroundColor:'yellow'
  },
  title: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: '600'
  },

  recrButton: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-start' ,
    paddingLeft:2,
    paddingTop:1


  },
  recrGrade: {
    flexDirection:'row',
    justifyContent:'flex-end',
    textAlign:'right'
  },

  recomendContainer: {
    flexDirection:'row',
    // backgroundColor:'blue'
  },
  recrTextContainer: {
    flexDirection:'row',
    // backgroundColor:'red'
  },
  recrText: {
    justifyContent: 'flex-start' ,
    fontSize: 14,
    fontWeight: '500',
    color: Style.constants.colors[2],
    flexDirection:'row'

  },
  recommended: {
    flexDirection:'row',
    color:'#aaa'
  },
  addRecr: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-end' ,
    width:40

  },
  addRecrText: {
    color: '#fff',
    textAlign: 'center',
    width:40,
    backgroundColor: Style.constants.colors[2],
    fontSize: 26,
    marginTop:0,
    marginBottom:0
  },
  score: {
    textAlign: 'right',
    fontSize: 14,
    color:'#444',
  },

});
