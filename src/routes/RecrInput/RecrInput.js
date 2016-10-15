import React from 'react';
import { Text, View } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Button from '../../components/Button';
import RecrSelection from '../../components/RecrSelection';
import GenericTextInput, { InputWrapper } from '../../components/GenericTextInput';
import styles from './styles';

import Meteor, { MeteorListView } from 'react-native-meteor';


const RecrInput = (props) => {
  const { updateState, onSelect, addRecr, assignRecr, name, recr, rec } = props;

  console.log('recr input rec',props)

  return (
    <View style={styles.container}>

      <InputWrapper>
        <GenericTextInput
          placeholder={"Who recommended " + rec.title}
          value={name}
          onChangeText={(name) => updateState({ name })}
        />

      { name != '' ?
        <View style={styles.buttons}>
          <Button text="Add Friend" onPress={addRecr} />
        </View>

      : null }


      </InputWrapper>

      <View>
      <RecrSelection onSelect={(recr) => updateState({ recr })} recr={recr} />

      {recr._id ?
        <View style={styles.buttons}>
          <Button text="Assign Friend" onPress={assignRecr} />
        </View>
        : null
      }

      </View>

      <KeyboardSpacer />
    </View>
  );
};

RecrInput.propTypes = {
  updateState: React.PropTypes.func,
  addRecr: React.PropTypes.func,
  assignRecr: React.PropTypes.func,
};

export default RecrInput;
