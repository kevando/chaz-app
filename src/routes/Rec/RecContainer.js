import React, { Component, PropTypes } from 'react';
import Meteor, { connectMeteor } from 'react-native-meteor';
import Rec from './Rec';
import Routes from '../../config/routes';

class RecContainer extends Component {

  // getMeteorData() {
  //   const { rec } = this.props;
  //   // const handle = Meteor.subscribe('recrs-list',Meteor.userId());
  //   // var recr =  Meteor.collection('recrs').findOne({_id: rec.recr_id})
  //   return {
  //     recr: recr
  //   };
  // }

  constructor(props) {
    super(props);

    this.state = {
      grade: this.props.rec.grade || null,

    };
  }

  handleAssignGrade() {
    const { grade } = this.state;
    const { rec, navigator } = this.props;
    rec.grade = grade;

    Meteor.call('gradeRec',rec,function(err,res){
      // navigator.pop();
    });
  }

  updateGrade(grade){
    // dont let user change grade this is tmp
    if(!this.props.rec.grade)
      this.setState({grade});

  }
  getGradeStyle(grade) {
    if(this.state.grade >= grade)
      return {fontSize:36,opacity:1}
  }

  render() {

    const { rec, navigator } = this.props;
    // const { recr } = this.data;

    return (
      <Rec
        rec={rec}
        updateGrade={this.updateGrade.bind(this)}
        getGradeStyle={this.getGradeStyle.bind(this)}
        updateState={this.setState.bind(this)}
        onGradeRecPress={this.handleAssignGrade.bind(this)}
        onRecrEditPress={() => navigator.push(Routes.getRecrInputRoute(rec))}
        onRecrPress={() => navigator.push(Routes.getRecrRoute(recr))}
        {...this.state}
      />
    );
  }
}

RecContainer.propTypes = {
  rec: PropTypes.object,
};

connectMeteor(RecContainer);
export default RecContainer;
