import React from 'react';
import {View, TouchableOpacity, Text,TextInput, StyleSheet, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Screen from './Screen';

export default class ScreenManager extends React.Component {

  constructor(props){
    super(props);
    var params = this.props.navigation.state.params;
    this.state = {
      screens: params.screens,
      currentScreen: params.currentScreen,
      lastScreen: params.screens.length -1,
      stages: params.stages,
      currentStage: params.currentStage,
      lastStage: params.lastStage
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: '',
    headerStyle: styles.mainHeader,
    headerTintColor: '#FFF',
  });

  GoTo()
  {
    if ( this.state.currentScreen == this.state.lastScreen)
    {
      //Si es la ultima pantalla, mando al StageManager
      this.props.navigation.navigate('StageManager',{stages: this.state.stages, currentStage: this.state.currentStage + 1 });
    }
    else
    {
      this.props.navigation.navigate('ScreenManager',
        {
          screens: this.state.screens,
          currentScreen: this.state.currentScreen + 1,
          stages: this.state.stages,
          currentStage: this.state.currentStage,
          lastStage: this.state.lastStage,
          SaveState: this.props.navigation.state.params.SaveState
        }
      );
    }
  }

  SaveState(element,value)
  {
    this.props.navigation.state.params.SaveState(this.state.currentScreen,element,value);
  }

  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}>
        <Screen screen={ this.state.screens[this.state.currentScreen]} navigation={ this.props.navigation } SaveState={this.SaveState.bind(this)} />
          <View>
            <TouchableOpacity style={styles.nextButton} onPress={ () => { this.GoTo() } } >
              <Text style={styles.textButton}>Continuar</Text>
            </TouchableOpacity>
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


