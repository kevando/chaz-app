import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
// import styles from './styles';
import { colors, text } from '../../config/styles';


export const Name = ({friend}) => {
  const textStyles = [
    ...text,
    // props.center && {textAlign: 'center',marginVertical: 20,paddingHorizontal: 40,},
    // props.title && {fontSize: 20,fontWeight: '600'}
    {
      color: colors.pink,
      fontSize: 21,
      fontWeight: '600',
    }

  ]
  return (
    <Text style={textStyles}>{friend.name}</Text>
  )
}

//
// export const Button = (props) => {
//
//   // Defaults
//   const { text, onPress, color='white', bgcolor='green' } = props;
//
//   const customStyles =
//   {
//     backgroundColor: colors[bgcolor],
//     borderColor: colors[bgcolor],
//     color: color,
//   }
//
//   return (
//     <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
//       <View style={styles.container}>
//         <Text style={[styles.buttonText,customStyles]}>
//           {text}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };
//
//
