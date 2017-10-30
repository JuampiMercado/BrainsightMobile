import React from 'react';
import {Text,View,TouchableHighlight, StyleSheet, AsyncStorage,Alert } from 'react-native';
import RailsApi from '../../Config';
import { StackNavigator } from 'react-navigation';
//import { PushNotification  } from 'react-native-push-notification';

var PushNotification = require('react-native-push-notification');
export default class StageManager extends React.Component {

  constructor(props){
    super(props);
    var params = this.props.navigation.state.params;
    //this.state.test: Array of stages
    this.state = {
      user: params.user,
      test: params.test,
      stages: params.stages,
      currentStage: params.currentStage,
      lastStage: params.stages.length - 1 //Final stage
      ,show: null
    }
    this._setNotification = this._setNotification.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    title: '',
    headerLeft: null,
    headerStyle: styles.mainHeader,
    headerTintColor: '#FFF',
  });

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.show !== nextState.show) {
      return true;
    }
    if (this.state.currentStage !== nextState.currentStage) {
      return true;
    }
    return false;
  }

  _isEnableTimeRange(stage){
    return this.state.stages[stage].config.enableTimeRange;
  }
  _betweenTimeRange(stage){
    var hh = new Date().getHours();
    var mm = new Date().getMinutes();
    var currentTime = new Date("01/01/1900 " + hh + ":" + mm);
    var from = new Date("01/01/1900 " + this.state.stages[stage].config.from);
    var to = new Date("01/01/1900 " + this.state.stages[stage].config.to);
    //from = new Date("01/01/1900 05:00");
    //to=  new Date("01/01/1900 06:00");
    return from <= currentTime && currentTime <= to;
  }
  _pushNotification(stage){
    var from = this.state.stages[stage].config.from;
    var to = this.state.stages[stage].config.to;
    Alert.alert('¡Atención!','Esta estapa debe ser realizada entre las ' + from + ' y '+ to + '. Será redirigido al menú principal.',
    [
      {text: 'Continuar', 
      onPress: () => {
        this._setNotification(from); 
        this.props.navigation.navigate('Main', {user: this.state.user, linkID: false});
    
      }},
    ],
    { cancelable: false }
    );
  }

  _setNotification(hour){
    var currentTime = new Date("01/01/1900 " + new Date().getHours() + ":" + new Date().getMinutes());
    var notifTime = new Date("01/01/1900 " + hour);
    var leftTime = notifTime - currentTime;
    var dateNotification = new Date();
    if (leftTime > 0){
      dateNotification = new Date( Date.now() + leftTime );
    }
    else {
      dateNotification = new Date(Date.now() +  ((24 * 60 * 60 * 1000) + leftTime));
      //If leftTime <= 0, i must set notifications on next day
      //So, leftTime are the number of milliseconds that passed the test time
      //24 hours + leftTime, remember leftTime < 0, are the hours i must wait
    }
    PushNotification.localNotificationSchedule({
      message: this.state.test.name + " está listo para continuar la siguiente etapa", // (required)
      date: dateNotification
    });

  }
  componentWillMount(){
    /*Checking if are stages complete*/
    var currentStage = this.state.currentStage;
    var stageIndex = this._getIndex(false, this.state.stages, 'completed' )
    //if stageIndex is -1, all stages are complete. So, stageIndex is lastStage + 1
    if(stageIndex == -1) stageIndex = this.state.lastStage + 1;
    if (stageIndex > currentStage)
    {
      this.setState({currentStage: stageIndex});
      currentStage = stageIndex;
    }
    /*End of checking*/

    if( currentStage <= this.state.lastStage ){
      //There are still stages
      if (this._isEnableTimeRange(currentStage) && !this._betweenTimeRange(currentStage)){
        this._pushNotification(currentStage);
        return false;
      }
      /*Checking if are screens complete*/
      var currentScreen = 0;
      var screenIndex = this._getIndex(false, this.state.stages[currentStage].screens, 'completed' )
      if (this.state.currentScreen != 0) currentScreen = screenIndex;
      /*End of checking*/

      this.props.navigation.navigate('ScreenManager',
        {
          user: this.state.user,
          test: this.state.test,
          screens: this.state.stages[currentStage].screens,//[screens]: Array of screens
          currentScreen: currentScreen,
          stages: this.state.stages,
          currentStage: currentStage,
          lastStage: this.state.lastStage,
          SaveState: this._SaveState.bind(this),
          SaveAsyncStorage: this._SaveAsyncStorage.bind(this),
          SetCompleteElement: this._SetCompleteElement.bind(this),
          PersistResults: this._PersistResults.bind(this),
          setSensorValue: this._setSensorValue.bind(this),
          _shouldEnableContinue: this._shouldEnableContinue.bind(this)
        }
      );
      this.setState({show: <Text>Cargando etapa {currentStage + 1}</Text>})
    }
    else{
      //No more stages
      this.setState({show: <View><Text>Gracias por colaborar</Text><TouchableHighlight style={styles.nextButton} onPress={ () => { this._PersistResults(1); } }><Text style={styles.textButton}>Enviar respuesta</Text></TouchableHighlight></View>});
    }
    
  }
  


  _getIndex(value, arr, prop) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
  }

  async _FetchResult(result)
  {
    var msg = 'Se ha producido un error al sincronizar la información.';
    var description = 'Por favor, ingrese al test mas tarde para reintentar la operación. Presione continuar para volver a la pantalla principal';

    try {
      let response = await fetch(RailsApi('result'), {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            result: result
          }),
        });

      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
          //if ok
          msg = 'La información fue enviada correctamente.';
          description ='Muchas gracias por colaborar. Presione continuar para volver a la pantalla principal';
          var id = 0;
          AsyncStorage.removeItem('test-' + result.test_id);
      } else {
          let error = res;
          throw error;
      }
    } catch(error) {
        console.log('[_FetchResult|StageManager]' + error);
    }

    Alert.alert(
      msg,
      description,
      [
        {text: 'Continuar', onPress: () => this.props.navigation.navigate('Main', {user: this.state.user, linkID: false})},

      ],
      { cancelable: false }
    )

  }

  
  

  _setSensorValue(screen,sensors){
    var stages = this.state.stages;
    for(var i = 0,len = stages[this.state.currentStage].screens[screen].elements.length; i < len; i++ ){
      stages[this.state.currentStage].screens[screen].elements[i].sensors = sensors;
    }
    console.log('[_setSensorValue|StageManager]')
    console.log(stages);
    this.setState({stages: stages});
  }

  _SaveState(screen,element,value){
    var stages = this.state.stages;
    stages[this.state.currentStage].screens[screen].elements[element].config.answer.value = value;
    this.setState({stages: stages});
  }

  _shouldEnableContinue(screen){
    var elements = this.state.stages[this.state.currentStage].screens[screen].elements;
    let enable = true && (elements.length > 0);
    elements.forEach(function(element) {
      enable = enable && this._hasValue(element);
    }, this);
    return enable;
  }

  _hasValue(element){
    console.log('hasValue');
    console.log(element);
    let hasValue = true;
    if (element.type === 'Question'){
      hasValue = (String(element.config.answer.value) != '');
    }
    return hasValue;
  }

  _SetCompleteElement(iStage,iScreen){
    var stages=this.state.stages;
    if(iScreen == undefined || iScreen == null)
    {
      stages[iStage].completed = true;
    }
    else{
      stages[iStage].screens[iScreen].completed = true;
    }
    this.setState({stages: stages})
  }


  _SaveAsyncStorage(testID){
    var test = this.state.test;
    test.data = this.state.stages;
    var value = JSON.stringify(test);
    AsyncStorage.setItem("test-" + testID, value);
  }

  _PersistResults(state)
  {
    this._SaveAsyncStorage(this.state.test.id);
    //Before send result, destroy "completed" property from screen and stage object.
    result = new Object();
    result.test_id = this.state.test.id;
    result.user_id = this.state.user.id;
    result.state = state;
    stages = this.state.stages;
    stages.map((stage, i) => {
      delete stage.completed;
      stage.screens.map((screen,j) =>{
        delete screen.completed;
      });
    });
    if (state == 1){//If completed
      result.data = JSON.stringify(stages);
    }
    console.log('[_PersistResults|StageManager]');
    console.log(result);
    this._FetchResult(result,state);
  }

  

  render(){
    return(
      <View style={styles.container}>
        {this.state.show}
        
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


