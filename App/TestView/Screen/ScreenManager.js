import React from 'react';
import {View, TouchableHighlight, Text,TextInput, StyleSheet, AsyncStorage,DeviceEventEmitter,NativeModules } from 'react-native';
import ScreenHeaderNav from './ScreenHeaderNav'
import { StackNavigator } from 'react-navigation';
import Screen from './Screen';
import { SensorManager } from 'NativeModules';


var temperatura = 0;
var light = 0;
var proximity = 0;
var _handlerThermo,_handlerLight,_handlerProxy,_handlerGyroscope;

export default class ScreenManager extends React.Component {

  constructor(props){
    super(props);
    var params = this.props.navigation.state.params;
    this.state = {
      user: params.user,
      test: params.test,
      screens: params.screens,
      currentScreen: params.currentScreen,
      lastScreen: params.screens.length -1,
      stages: params.stages,
      currentStage: params.currentStage,
      lastStage: params.lastStage,
      sensors: { reaction: new Date(), thermometer: 0, lightSensor: 0, proximity: 0 }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.currentScreen !== nextState.currentScreen) {
      return true;
    }
    if (this.state.currentStage !== nextState.currentStage) {
      return true;
    }
    return false;
  }

  static navigationOptions = ({ navigation }) => ({
    title: '',
    headerLeft: ( <ScreenHeaderNav position={'left'} navigation={navigation} /> ),
    headerRight: ( <ScreenHeaderNav position={'right'} navigation={navigation} /> ),
    headerStyle: styles.mainHeader,
    headerTintColor: '#FFF',
  });

  componentDidMount(){
    this._startSensors();
  }

  componentWillUnmount() {
    this._handlerLight.remove();
    this._handlerProxy.remove();
    this._handlerThermo.remove();
    this._handlerGyroscope.remove();
  }


  GoTo()
  {
    this._setSensorValue();
    if (this.state.currentScreen == this.state.lastScreen){
      this.props.navigation.state.params.SetCompleteElement(this.state.currentStage);
    }
    this.props.navigation.state.params.SetCompleteElement(this.state.currentStage,this.state.currentScreen);
    this.props.navigation.state.params.SaveAsyncStorage(this.state.test.id);
    if ( this.state.currentScreen == this.state.lastScreen)
    {
      //Si es la ultima pantalla, mando al StageManager
      this.props.navigation.navigate('StageManager',
        {
          user: this.state.user,
          test: this.state.test,
          stages: this.state.stages,
          currentStage: this.state.currentStage + 1
        }
      );
    }
    else
    {
      this.props.navigation.navigate('ScreenManager',
        {
          user: this.state.user,
          test: this.state.test,
          screens: this.state.screens,
          currentScreen: this.state.currentScreen + 1,
          stages: this.state.stages,
          currentStage: this.state.currentStage,
          lastStage: this.state.lastStage,
          SaveState: this.props.navigation.state.params.SaveState,
          SaveAsyncStorage: this.props.navigation.state.params.SaveAsyncStorage,
          SetCompleteElement: this.props.navigation.state.params.SetCompleteElement,
          PersistResults: this.props.navigation.state.params.PersistResults,
          setSensorValue: this.props.navigation.state.params.setSensorValue
        }
      );
    }
  }

  _startSensors(){
    SensorManager.startThermometer(100);
    SensorManager.startLightSensor(100);
    SensorManager.startProximity(100);
    SensorManager.startGyroscope(100);
    SensorManager.startAccelerometer(100); // To start the accelerometer with a minimum delay of 100ms between events.
    DeviceEventEmitter.addListener('Accelerometer', function (data) {
      console.log(data)
      /**
      * data.x
      * data.y
      * data.z
      **/
    });
    console.log(SensorManager);
    DeviceEventEmitter.addListener('LightSensor', function (data) {
      light = data.light;
      console.log(data);
    });
    DeviceEventEmitter.addListener('Thermometer', function (data) {
      console.log(data.temp);
      //temperatura = (temperatura + (data.temp==undefined? temperatura : data.temp)) / 2;
    });
    DeviceEventEmitter.addListener('Proximity', function (data) {
      /**
      * data.isNear: [Boolean] A flag representing whether something is near the screen.
      * data.value: [Number] The raw value returned by the sensor (usually distance in cm).
      * data.maxRange: [Number] The maximum range of the sensor.
      **/
      console.log(data);
    });
    DeviceEventEmitter.addListener('Gyroscope', function (data) {
      console.log('data.x: ' + data.x);
      console.log('data.y: ' + data.y);
      console.log('data.z: ' + data.z);
    });

    
    
  }

  _stopSensors(){
    SensorManager.stopThermometer();
    SensorManager.stopLightSensor();
    SensorManager.stopProximity();
    SensorManager.stopGyroscope();
  }
  _setSensorValue(){
    var sensors = this.state.sensors;
    sensors.reaction = ((new Date() - sensors.reaction) / 1000);
    sensors.lightSensor = light;
    sensors.thermometer = temperatura;
    sensors.proximity = proximity;
    this.props.navigation.state.params.setSensorValue(this.state.currentScreen,sensors);
  }


  _SaveState(element,value)
  {
    this.props.navigation.state.params.SaveState(this.state.currentScreen,element,value);
  }

  render(){
    return(
      <View style={styles.container}>
        <Screen screen={ this.state.screens[this.state.currentScreen]} navigation={ this.props.navigation } _SaveState={this._SaveState.bind(this)} />
        <View>
          <TouchableHighlight style={styles.nextButton} onPress={ () => { this.GoTo() } } >
            <Text style={styles.textButton}>Continuar</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}



const styles= StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  mainHeader: {
     backgroundColor: '#000000',
  },
  nextButton:{
    backgroundColor:'#000000',
    paddingVertical: 15,
    marginTop: 15,
    padding: 15,
  },
  textButton:{
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFF'
  },
})


