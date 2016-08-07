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
    // removing add recr until 0.8
    // {this.renderRecrDisplay()}

    var rec = this.props.rec;

    return (
      <TouchableOpacity onPress={ this.onRecPress.bind(this) }>

        <View style={styles.row} >

          <View style={styles.innerRowTop}>
            <View style={styles.left} >
              <RecType type={rec.type} size={30} />
            </View>
            <View style={styles.right} >
              <Text style={styles.title} >{rec.title}</Text>
              { this.renderRecNote() }
            </View>
          </View>

          <View style={styles.innerRowBottom}>
            <RecDate timestamp={rec.createdAt} />
          </View>

        </View>

      </TouchableOpacity>
    );
  }

  renderRecNote() { // dont give spacing for note if its not there
    if(this.props.rec.note)
    return(<Text>{this.props.rec.note}</Text>);
  }

  // renderRecrDisplay() {
  //
  //   const recr = this.props.rec.recr;
  //   if(recr){
  //     return (
  //       <View style={styles.recrTextContainer}>
  //         <View style={styles.recomendContainer}>
  //           <Text style={styles.recommended} >Recommended by </Text>
  //         </View>
  //         <View style={styles.recrTextContainer}>
  //           <TouchableOpacity style={styles.recrButton} onPress={ this.onRecrPress.bind(this) }>
  //             <Text style={styles.recrText} >{recr.name}</Text>
  //             </TouchableOpacity>
  //         </View>
  //       </View>
  //
  //     )
  //   } else {
  //     return (
  //       <AddRecr rec={this.props.rec}/>
  //     );
  //   }
  // }

  // getRecrName() {
  //   if(this.props.rec.recr)
  //     return this.props.rec.recr.name
  // }
  // getRecrScore() {
  //   if(this.props.rec.recr)
  //     return this.props.rec.recrScore
  // }

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

  // onRecrPress() {
  //   this.props.navigator.push({
  //     title: "",
  //     screen: "chaz.RecrViewScreen",
  //     passProps: {recrKey:this.props.rec.recr._key }
  //   });
  // }

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
    fontSize: 11,
    fontWeight: '300',
    color: "#666",
    letterSpacing:1.0
  }

});
