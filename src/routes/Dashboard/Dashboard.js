import React from 'react';
import { View} from 'react-native';

import { Container, Content, List, ListItem, Button, Text, Icon } from 'native-base';

const Dashboard = (props) => {

  const { recommendations, onNewRecPress } = props;

  return (
    <Container>
      <Content>
        <List dataArray={recommendations}
            renderRow={({title,recr}) =>
                <ListItem iconLeft>
                <Icon name="ios-book" style={{ color: '#0A69FE' }} />
                    <Text>{title}</Text>
                    <Text note>{recr}</Text>
                </ListItem>
            }>
        </List>
        <Button block onPress={onNewRecPress}>ADD RECOMMENDATION</Button>
      </Content>
    </Container>
  );


}

export default Dashboard;
