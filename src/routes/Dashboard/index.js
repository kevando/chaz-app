import React from 'react';
import { Text, View, ScrollView, LayoutAnimation } from 'react-native';
// import styles from './styles';
// import Button from '../../components/Button';
// import Loading from '../../components/Loading';
// import * as Widget from '../../components/Widgets';
//
// import * as Animatable from 'react-native-animatable';

import { Container, Content, Button } from 'native-base';

class Dashboard extends React.Component {

  render() {

    // const { widgetData, onAddRecPress, dataReady, onRecrPress } = this.props;



      return (

        <Container>
                <Content>

                    <Button onPress={()=>alert('asdf')}> Click Me! </Button>
                </Content>
            </Container>





      );

  }
}


export default Dashboard;
