import React, { Component } from 'react';
import { Text,View,StyleSheet,TouchableHighlight, AsyncStorage,Alert,NativeModules } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { SensorManager } from 'NativeModules';

export default class ScreenHeaderNav extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      navigation: this.props.navigation,
      position: this.props.position == undefined ? 'right' : this.props.position
    }
  }

  _stopSensors(){
    SensorManager.stopThermometer();
    SensorManager.stopLightSensor();
    SensorManager.stopProximity();
    SensorManager.stopGyroscope();
    SensorManager.stopAccelerometer();
    
  }

  render(){
    element = null;
    switch(this.state.position)
    {
      case 'left':
        element = <ScreenLeftNav {...this.state} _stopSensors={this._stopSensors.bind(this)} />
        break;
      case 'right':
        element = <ScreenRightNav {...this.state} _stopSensors={this._stopSensors.bind(this)} />
        break;
    }
    return element;
  }
}


class ScreenLeftNav extends React.Component{
  constructor(props){
    super(props);
    this.cancelTest = this.cancelTest.bind(this);
  }
  cancelButton(){
    Alert.alert(
      'Al cancelar no podrá volver a realizar el test',
      '¿Desea cancelar de todas formas?',
      [
        {text: 'Si', onPress: () => this.cancelTest()},
        {text: 'No', onPress: () => {}, style: 'cancel'},
      ],
      { cancelable: false }
    )

  }
  cancelTest(){
    this.props._stopSensors();
    AsyncStorage.removeItem('test-' + this.props.navigation.state.params.test.id);
    this.props.navigation.state.params.PersistResults(0);
  }
  render(){
    return(
      <View style={styles.container}>
        <TouchableHighlight onPress={ this.cancelButton.bind(this) }>
          <Text style={ styles.text}>Cancelar</Text>
        </TouchableHighlight>
      </View>
    );
  }
}


class ScreenRightNav extends React.Component{
  SaveTest(){
    this.props._stopSensors();
    this.props.navigation.state.params.SaveAsyncStorage(this.props.navigation.state.params.test.id)
    this.props.navigation.navigate('Main');
  }
  render(){
    return(
      <View style={styles.container}>
        <TouchableHighlight onPress={ this.SaveTest.bind(this) }>
          <Text style={ styles.text}>Guardar</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles= StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#FFF'
  },
})
