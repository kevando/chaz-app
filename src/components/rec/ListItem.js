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
    // removing add recr until 0.7.7
    // {this.renderRecrDisplay()}

    var rec = this.props.rec;

    return (
      <TouchableOpacity style={styles.row} onPress={ this.onRecPress.bind(this) }>
        <View style={styles.left}>
          <RecType type={rec.type} size={25} />
        </View>
        <View style={styles.middle}>
          <Text style={styles.title} >{rec.title}</Text>

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
      backButtonTitle: 'Back',
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
    backgroundColor: 'white',
    borderBottomWidth:1,
    borderBottomColor: '#ddd',

    flexDirection: 'row',
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:5,
    paddingRight:5
  },
  left: {
    flex:2,
    justifyContent: 'center', // vertical middle
    flexDirection: 'column',
    // backgroundColor: 'yellow'
  },
  middle: {
    flex:12,
    flexDirection: 'column',
    // backgroundColor: 'blue',
    justifyContent: 'center', // vertical middle
  },
  right: {
    flex:4,
    justifyContent: 'center', // vertical middle
    flexDirection: 'column',
    // backgroundColor:'yellow'
  },
  title: {
    textAlign: 'left',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing:1.3
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
