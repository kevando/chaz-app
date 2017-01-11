import React from 'react';
import _ from 'lodash';
import { Container, Content, List, ListItem, Text, Icon, Button, Badge } from 'native-base';

const Debug = (props) => {

  const { recommendations, onPurgePress } = props;

  return (
    <Container>
      <Content>
        <List>
          <ListItem iconLeft>
            <Icon name="ios-settings-outline" style={{ color: '#0A69FE' }} />
            <Text>Recommendations</Text>
            <Badge style={{ backgroundColor: '#8C97B5' }}>{recommendations.length}</Badge>
          </ListItem>
        </List>
          <Button danger onPress={onPurgePress}>Purge Data</Button>
      </Content>
  </Container>
  );
}

export default Debug;
