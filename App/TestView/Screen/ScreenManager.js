import React from 'react';
import { View, TouchableHighlight, Text, TextInput, StyleSheet, AsyncStorage, DeviceEventEmitter, NativeModules, Keyboard } from 'react-native';
import ScreenHeaderNav from './ScreenHeaderNav'
import { StackNavigator,NavigationActions } from 'react-navigation';
import Screen from './Screen';
import { SensorManager } from 'NativeModules';



export default class ScreenManager extends React.Component {

  constructor(props) {
    super(props);
    var params = this.props.navigation.state.params;
    this.state = {
      user: params.user,
      test: params.test,
      screens: params.screens,
      currentScreen: params.currentScreen,
      lastScreen: params.screens.length - 1,
      stages: params.stages,
      currentStage: params.currentStage,
      lastStage: params.lastStage,
      reaction: { begin: new Date(), end: null, difference: 0 },
      thermometer: 0,
      light: 0,
      accelerometer: { x: 0, y: 0, z: 0 },
      gyroscope: { x: 0, y: 0, z: 0 },
      stepCounter: 0,
      enableContinue: false
    }

  }

  /* shouldComponentUpdate(nextProps, nextState) {
     if (this.state.currentScreen !== nextState.currentScreen) {
       return true;
     }
     if (this.state.currentStage !== nextState.currentStage) {
       return true;
     }
     return false;
   }
 */
  static navigationOptions = ({ navigation }) => ({
    title: '',
    headerLeft: (<ScreenHeaderNav position={'left'} navigation={navigation} />),
    headerRight: (<ScreenHeaderNav position={'right'} navigation={navigation} />),
    headerStyle: styles.mainHeader,
    headerTintColor: '#FFF',
  });

  componentWillMount(){
    this.props.navigation.setParams({
      _enableContinue: this._enableContinue.bind(this)
    });
  }
  componentDidMount() {
    Keyboard.dismiss();
    this._startSensors();
  }

  componentWillUnmount() {
    DeviceEventEmitter.removeListener('Accelerometer');
    DeviceEventEmitter.removeListener('LightSensor');
    DeviceEventEmitter.removeListener('Thermometer');
    DeviceEventEmitter.removeListener('Gyroscope');
    DeviceEventEmitter.removeListener('StepCounter');
  }

  
  GoTo() {

    this._setSensorValue();
    this._stopSensors();
    if (this.state.currentScreen == this.state.lastScreen) {
      this.props.navigation.state.params.SetCompleteElement(this.state.currentStage);
    }
    this.props.navigation.state.params.SetCompleteElement(this.state.currentStage, this.state.currentScreen);
    this.props.navigation.state.params.SaveAsyncStorage(this.state.test.id);
    if (this.state.currentScreen == this.state.lastScreen) {
      //Si es la ultima pantalla, mando al StageManager
      this.props.navigation.navigate('StageManager',
        {
          user: this.state.user,
          test: this.state.test,
          stages: this.state.stages,
          currentStage: this.state.currentStage + 1
        }
      );
      
    } else {
      this.setState({ currentScreen: this.state.currentScreen + 1, enableContinue: false });
      // this.props.navigation.navigate('ScreenManager',
      //   {
      //     user: this.state.user,
      //     test: this.state.test,
      //     screens: this.state.screens,
      //     currentScreen: this.state.currentScreen + 1,
      //     stages: this.state.stages,
      //     currentStage: this.state.currentStage,
      //     lastStage: this.state.lastStage,
      //     SaveState: this.props.navigation.state.params.SaveState,
      //     SaveAsyncStorage: this.props.navigation.state.params.SaveAsyncStorage,
      //     SetCompleteElement: this.props.navigation.state.params.SetCompleteElement,
      //     PersistResults: this.props.navigation.state.params.PersistResults,
      //     setSensorValue: this.props.navigation.state.params.setSensorValue
      //   }
      // );
    }
  }

  _startSensors() {
    this._initSensors();
    this._bindSensorsEvent();
  }

  _initSensors() {
    SensorManager.startThermometer(800);
    SensorManager.startLightSensor(800);
    SensorManager.startGyroscope(800);
    SensorManager.startAccelerometer(800);
    SensorManager.startStepCounter(1000);
  }

  _bindSensorsEvent() {
    DeviceEventEmitter.addListener('Accelerometer', function (data) {
      this.setState({ accelerometer: { x: data.x, y: data.y, z: data.z } });
    }.bind(this));
    DeviceEventEmitter.addListener('LightSensor', function (data) {
      this.setState({ light: data.light });
    }.bind(this));
    DeviceEventEmitter.addListener('Thermometer', function (data) {
      this.setState({ thermometer: data.temp });
    }.bind(this));
    DeviceEventEmitter.addListener('Gyroscope', function (data) {
      this.setState({ gyroscope: { x: data.x, y: data.y, z: data.z } });
    }.bind(this));
    DeviceEventEmitter.addListener('StepCounter', function (data) {
      this.setState({ stepCounter: data.steps });
    }.bind(this));
  }

  _stopSensors() {
    SensorManager.stopThermometer();
    SensorManager.stopLightSensor();
    SensorManager.stopGyroscope();
    SensorManager.stopAccelerometer();
    SensorManager.stopStepCounter();
  }

  _setSensorValue() {
    var reaction = this.state.reaction;
    var now = new Date();
    reaction.end = now;
    reaction.difference = now - reaction.begin;
    var sensors = { reaction: reaction, accelerometer: this.state.accelerometer, thermometer: this.state.thermometer, light: this.state.light, gyroscope: this.state.gyroscope, stepCounter: this.state.stepCounter }
    this.props.navigation.state.params.setSensorValue(this.state.currentScreen, sensors);
  }

  _enableContinue(state){
    this.setState({enableContinue: state});
  }

  _SaveState(element, value) {
    this.props.navigation.state.params.SaveState(this.state.currentScreen, element, value);
    let enableContinue = this.props.navigation.state.params._shouldEnableContinue(this.state.currentScreen);
    console.log('enableContinue');
    console.log(enableContinue);
    //this.setState({enableContinue: enableContinue})
    this._enableContinue(enableContinue);
    
  }

  render() {
    
    const nextButton =  {
      backgroundColor: this.state.enableContinue ? '#000000' : '#A9A8A8' ,
      paddingVertical: 15,
      marginTop: 15,
      padding: 15,
    }
    return (
      <View style={styles.container}>
        <Screen screen={this.state.screens[this.state.currentScreen]} navigation={this.props.navigation} _SaveState={this._SaveState.bind(this)} />
        <View>
          <TouchableHighlight
            disabled={!this.state.enableContinue}
            style={nextButton} onPress={() => { this.GoTo() }} >
            <Text style={styles.textButton}>Continuar</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  mainHeader: {
    backgroundColor: '#000000',
  },
  nextButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    marginTop: 15,
    padding: 15,
  },
  textButton: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFF'
  },
})


