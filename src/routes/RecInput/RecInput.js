import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Button from '../../components/Button';
import RecCategory from '../../components/RecCategory';
import GenericTextInput, { InputWrapper } from '../../components/GenericTextInput';
import styles from './styles';

var dismissKeyboard = require('dismissKeyboard');

class RecInput extends Component {

  componentDidMount() {
    // User is adding a new Rec, auto load the keyboard
    if(!this.props.rec) this.refs.TitleInput.focus(true);
  }

  render() {
    const { updateState, saveRec, onEditRecrPress, headerText, title, note, category, initial, onDismiss, rec } = this.props;

    return (

      <View style={styles.container}>

        <View style={styles.inputContainer}>
          <View style={styles.header}>

            <Text style={styles.headerText}>{headerText}</Text>
              <RecCategory
                category={category}
                onChange={(category) => updateState({ category })}
                {...this.state}
                />
              <Text style={styles.headerText}>Recommendation</Text>

          </View>

          <InputWrapper>
            <TextInput
              style={styles.input}
              placeholder="What was recommended?"
              value={title}
              ref="TitleInput"
              onChangeText={(title) => updateState({ title })}
              />

            <GenericTextInput
              placeholder="Write a note"
              value={note}
              onChangeText={(note) => updateState({ note })}
              multiline={true}
              />
          </InputWrapper>

          {false ?
            <View style={styles.buttons}>
              <TouchableOpacity onPress={onEditRecrPress.bind(this,rec)} ><Text>Change Recommender</Text></TouchableOpacity>
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
