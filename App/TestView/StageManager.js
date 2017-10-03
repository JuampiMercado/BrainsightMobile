import React from 'react';
import {View, StyleSheet, AsyncStorage } from 'react-native';
import RailsApi from '../Config';
import Stage from './TestElements/Stage'
import { StackNavigator } from 'react-navigation';

export default class StageManager extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      test: this.props.test,
      currentStage: 0
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: '',
    headerStyle: styles.mainHeader,
    headerTintColor: '#FFF',
  });

  render(){
    return(
      <View style={styles.container}>
        </View>
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
