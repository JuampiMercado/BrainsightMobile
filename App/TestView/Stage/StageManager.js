import React from 'react';
import {Text,View,Button, StyleSheet, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';


export default class StageManager extends React.Component {

  constructor(props){
    super(props);
    var params = this.props.navigation.state.params;
    //this.state.test: Array of stages
    this.state = {
      stages: params.stages,
      currentStage: params.currentStage,
      lastStage: params.stages.length - 1 //Final stage
      ,show: ''
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: '',
    headerStyle: styles.mainHeader,
    headerTintColor: '#FFF',
  });

  componentWillMount(){
    if( this.state.currentStage <= this.state.lastStage ){
      //Todavia no pase por todas las etapas
      var screens = this.state.stages[this.state.currentStage].screens;//[screens]: Array of screens
      this.props.navigation.navigate('ScreenManager', { screens: screens, currentScreen: 0, stages: this.state.stages, currentStage: this.state.currentStage, lastStage: this.state.lastStage } );
      this.setState({show: <Text>Cargando etapa {this.state.currentStage + 1}</Text>})
    }
    else{
      this.setState(
        {show:
          <View>
            <Text>Gracias por colaborar</Text>
            <Button onPress={ () => { this.PersisResults(); } } title="Enviar respuesta" color="#000" />
          </View>
        }
      );
      //voy a tener que navegar a una pantalla de fin de test
    }
  }

  PersisResults()
  {
    this.props.navigation.navigate('Main');
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
  }
})


