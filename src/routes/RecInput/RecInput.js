import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Button from '../../components/Button';
import RecCategory from '../../components/RecCategory';
import GenericTextInput, { InputWrapper, ChazTextInput } from '../../components/GenericTextInput';
import styles from './styles';


class RecInput extends Component {

  componentDidMount() {
    console.log('rec in input',this.props.rec)
    // User is adding a new Rec, auto load the keyboard
    if(!this.props.rec) this.refs.TitleInput.focus(true);
  }


  render() {
  const { updateState, saveRec, headerText, title, note, category } = this.props;

  return (
    <View style={styles.container}>
      <View style={styles.header}>

      <Text style={styles.headerText}>{headerText}</Text>
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
        />


      </InputWrapper>

      <RecCategory
        category={category}
        onChange={(category) => updateState({ category })}
        {...this.state}
      />

      <View style={styles.buttons}>
        <Button text="Save Rec" onPress={saveRec} />
      </View>

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
