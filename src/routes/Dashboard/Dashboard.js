import React from 'react';
import { View} from 'react-native';
import _ from 'lodash';
import { Container, Content, List, ListItem, Button, Text, Icon } from 'native-base';

const Dashboard = (props) => {

  const { recommendations, onNewRecPress } = props;

  // Using the dataArray List caused issue when the add rec popped up first
  return (
    <Container>
      <Content>
        <List>
        {
          _.map(recommendations,function({title,recr, note},i) {
            return(
              <ListItem iconLeft key={i}>
              <Icon name="ios-book" style={{ color: '#0A69FE' }} />
                  <Text>{title}</Text>
                  <Text>{note}</Text>
                  <Text style={{color:'#888'}}>{recr}</Text>
              </ListItem>
            )
          })
        }
        </List>
        
      </Content>
    </Container>
  );


}

export default Dashboard;
