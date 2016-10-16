import React, { Component, PropTypes } from 'react';
import Meteor, { connectMeteor } from 'react-native-meteor';
import Recr from './Recr';
import Routes from '../../config/routes';

class RecrContainer extends Component {

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
      grade: null,

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

  render() {

    const { recr, navigator } = this.props;
    // console.log('propssss',this.props)
    // const { recr } = this.data;

    return (
      <Recr
        recr={recr}
      />
    );
    // return (
    //   <Rec
    //     rec={rec}
    //     updateState={this.setState.bind(this)}
    //     onGradeRecPress={this.handleAssignGrade.bind(this)}
    //     onRecrEditPress={() => navigator.push(Routes.getRecrInputRoute(rec))}
    //   />
    // );
  }
}

RecrContainer.propTypes = {
  recr: PropTypes.object,
};

connectMeteor(RecrContainer);
export default RecrContainer;
