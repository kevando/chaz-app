import React from 'react';
import { Text, View } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Button from '../../components/Button';
import GenericTextInput, { InputWrapper } from '../../components/GenericTextInput';
import images from '../../config/images';
import styles from './styles';

const RecInput = (props) => {
  const { updateState, saveRec, headerText, title, note } = props;

  return (
    <View style={styles.container}>
      <View style={styles.header}>

      <Text style={styles.headerText}>{headerText}</Text>
      </View>

      <InputWrapper>
        <GenericTextInput
          placeholder="What was recommended?"
          value={title}
          onChangeText={(title) => updateState({ title })}
        />

        <GenericTextInput
          placeholder="Write a note"
          value={note}
          onChangeText={(note) => updateState({ note })}
        />


      </InputWrapper>



      <View style={styles.buttons}>
        <Button text="Save Rec" onPress={saveRec} />
      </View>

      <KeyboardSpacer />
    </View>
  );
};

RecInput.propTypes = {
  updateState: React.PropTypes.func,
  addRec: React.PropTypes.func,
  error: React.PropTypes.string,
  headerText: React.PropTypes.string,
};

export default RecInput;
