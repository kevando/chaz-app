import React from 'react';
import Emoji from 'react-native-emoji';

const emojiList = {
  default: 'paperclip',
  tv: "radio",
  movie: "vhs"
}

const RecCategory = ({rec}) => {

  const category = rec.category || 'default';

  return (
    <Emoji name={emojiList[category]} />
  );
};

RecCategory.propTypes = {
  rec: React.PropTypes.object,
};


export default RecCategory;
