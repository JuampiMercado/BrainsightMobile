import React from 'react';
import {View, StyleSheet, AsyncStorage } from 'react-native';
import RailsApi from '../Config';
import Stage from './TestElements/Stage'
import { StackNavigator } from 'react-navigation';


export default class TestManager extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      test: this.props.test,
      currentStage: this.props.navigation.state.params.currentStage
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
        <Stage navigation={this.props.navigation} StageData={ArrStages[this.state.currentStage]} />
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



var question1 = new Object();
question1.question= '¿Esta es la primer pregunta?';
question1.answer = '';
var question2 = new Object();
question2.question= '¿Esta es la segunda pregunta?';
question2.answer = '';
var question3 = new Object();
question3.question= '¿Esta es la tercer pregunta?';
question3.answer = '';
var Stage1 = new Object();
Stage1.config = null;
Stage1.data = [question1,question2];
var Stage2 = new Object();
Stage2.config = null;
Stage2.data = [question3];
var TestObject = new Object();
TestObject.data = [Stage1,Stage2];
var ArrStages= [Stage1,Stage2];
