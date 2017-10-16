import React from 'react';
import {Text,View,TouchableHighlight, StyleSheet, AsyncStorage,Alert } from 'react-native';
import RailsApi from '../../Config';
import { StackNavigator } from 'react-navigation';


export default class StageManager extends React.Component {

  constructor(props){
    super(props);
    var params = this.props.navigation.state.params;
    //this.state.test: Array of stages
    this.state = {
      user: params.user,
      testID: params.testID,
      stages: params.stages,
      currentStage: params.currentStage,
      lastStage: params.stages.length - 1 //Final stage
      ,show: ''
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.show !== nextState.show) {
      return true;
    }
    if (this.state.currentStage !== nextState.currentStage) {
      return true;
    }
    return false;
  }

  static navigationOptions = ({ navigation }) => ({
    title: '',
    headerLeft: null,
    headerStyle: styles.mainHeader,
    headerTintColor: '#FFF',
  });

  getIndex(value, arr, prop) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
  }

  componentWillMount(){
    /*Checking if are stages complete*/
    var currentStage = this.state.currentStage;
    var stageIndex = this.getIndex(false, this.state.stages, 'completed' )
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

      /*Checking if are screens complete*/
      var currentScreen = 0;
      var screenIndex = this.getIndex(false, this.state.stages[currentStage].screens, 'completed' )
      if (this.state.currentScreen != 0) currentScreen = screenIndex;
      /*End of checking*/

      this.props.navigation.navigate('ScreenManager',
        {
          user: this.state.user,
          testID: this.state.testID,
          screens: this.state.stages[currentStage].screens,//[screens]: Array of screens
          currentScreen: currentScreen,
          stages: this.state.stages,
          currentStage: currentStage,
          lastStage: this.state.lastStage,
          SaveState: this.SaveState.bind(this),
          SaveAsyncStorage: this.SaveAsyncStorage.bind(this),
          SetCompleteElement: this.SetCompleteElement.bind(this),
          PersistResults: this.PersistResults.bind(this)
        }
      );
      this.setState({show: <Text>Cargando etapa {currentStage + 1}</Text>})
    }
    else{
      //No more stages
      this.setState({show: <View><Text>Gracias por colaborar</Text><TouchableHighlight style={styles.nextButton} onPress={ () => { this.PersistResults(1); } }><Text style={styles.textButton}>Enviar respuesta</Text></TouchableHighlight></View>});
    }
  }

  SaveState(screen,element,value){
    var stages = this.state.stages;
    stages[this.state.currentStage].screens[screen].elements[element].config.result = value;
    this.setState({stages: stages});
  }

  SetCompleteElement(iStage,iScreen){
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

  SaveAsyncStorage(testID){
    var value = JSON.stringify(this.state.stages);
    AsyncStorage.setItem("test-" + testID, value);
  }

  PersistResults(state)
  {
    this.SaveAsyncStorage(this.state.testID);
    //Before send result, destroy "completed" property from screen and stage object.
    result = new Object();
    result.test_id = this.state.testID;
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
    console.log(result.test_id + ' '+ result.user_id);
    this.FetchResult(result);
  }

  async FetchResult(result)
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
      } else {
          let error = res;
          throw error;
      }
    } catch(error) {
        console.log(error);
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


