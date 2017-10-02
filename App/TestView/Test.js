import React from 'react';
import { View, Text,StyleSheet, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import RailsApi from '../Config';


export default class Test extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      test: this.props.navigation.state.params.test,
      user: this.props.navigation.state.params.user,
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: '',
    headerStyle: styles.mainHeader,
    headerTintColor: '#FFF',
  });

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View><Text>Aca se tiene que desplegar el test: {this.state.test.name} {this.state.user.email} </Text></View>
    );
  }
}


const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',//'#993366',
  },
  mainHeader: {
     backgroundColor: '#000000',
  }
})
