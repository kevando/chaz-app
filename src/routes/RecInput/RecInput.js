import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Button from '../../components/Button';
import RecCategory from '../../components/RecCategory';
import { InputWrapper, RecTitleInput, RecNoteInput } from '../../components/GenericTextInput';
import styles from './styles';

var dismissKeyboard = require('dismissKeyboard');

class RecInput extends Component {


  render() {
    const { updateState, saveRec, onRemoveRecrPress, onDeleteRecPress, onRemoveGradePress, headerText, title, note, category, initial, onDismiss, rec={} } = this.props;

    const isEditing = rec._id ? true : false;

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>

          <InputWrapper>
            <RecTitleInput
              value={title}
              onChangeText={(title) => updateState({ title })}
              />
            { isEditing ?
            <RecNoteInput
              value={note}
              onChangeText={(note) => updateState({ note })}
              borderTop={true}
            />
            : null }
          </InputWrapper>

          { isEditing ?
            <RecCategory
              category={category}
              onChange={(category) => updateState({ category })}
              {...this.state}
            />
          : null }


{rec.recr_id && !rec.grade ?
    <View style={styles.buttons}>
      <TouchableOpacity onPress={onRemoveRecrPress.bind(this,rec)} ><Text>Remove Recommender</Text></TouchableOpacity>
    </View>
  :
  null
 }

 {rec.grade ?
     <View style={styles.buttons}>
       <TouchableOpacity onPress={onRemoveGradePress.bind(this,rec)} ><Text>Remove Grade</Text></TouchableOpacity>
     </View>
   :
   null
  }

  {!rec.grade && !rec.recr_id  && Object.keys(rec).length > 0 ?
      <View style={styles.buttons}>
        <TouchableOpacity onPress={onDeleteRecPress.bind(this,rec)} ><Text>Delete Recommendation</Text></TouchableOpacity>
      </View>
    :
    null
   }


        </View>

        {title ?
          <View style={styles.buttons}>
            <Button text="Save Recommendation" onPress={saveRec} />
          </View>
        :
        null
       }



       {!title && initial ?
         <View style={styles.buttons}>
           <Button text="Dismiss" onPress={onDismiss} color="red" />
         </View>
       :
       null


      }



        <KeyboardSpacer />
      </View>
    );
  }
};

RecInput.propTypes = {
  updateState: React.PropTypes.func,
  addRec: React.PropTypes.func,
  error: React.PropTypes.string,
  headerText: React.PropTypes.string,
};

export default RecInput;
