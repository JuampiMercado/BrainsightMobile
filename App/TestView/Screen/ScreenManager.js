import React from 'react';
import {View, TouchableHighlight, Text,TextInput, StyleSheet, AsyncStorage } from 'react-native';
import ScreenHeaderNav from './ScreenHeaderNav'
import { StackNavigator } from 'react-navigation';
import Screen from './Screen';

export default class ScreenManager extends React.Component {

  constructor(props){
    super(props);
    var params = this.props.navigation.state.params;
    this.state = {
      testID: params.testID,
      screens: params.screens,
      currentScreen: params.currentScreen,
      lastScreen: params.screens.length -1,
      stages: params.stages,
      currentStage: params.currentStage,
      lastStage: params.lastStage
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

  GoTo()
  {
    if (this.state.currentScreen == this.state.lastScreen){
      this.props.navigation.state.params.SetCompleteElement(this.state.currentStage);
    }
    this.props.navigation.state.params.SetCompleteElement(this.state.currentStage,this.state.currentScreen);
    this.props.navigation.state.params.SaveAsyncStorage(this.state.testID);
    if ( this.state.currentScreen == this.state.lastScreen)
    {
      //Si es la ultima pantalla, mando al StageManager
      this.props.navigation.navigate('StageManager',
        {
          testID: this.state.testID,
          stages: this.state.stages,
          currentStage: this.state.currentStage + 1
        }
      );
    }
    else
    {
      this.props.navigation.navigate('ScreenManager',
        {
          testID: this.state.testID,
          screens: this.state.screens,
          currentScreen: this.state.currentScreen + 1,
          stages: this.state.stages,
          currentStage: this.state.currentStage,
          lastStage: this.state.lastStage,
          SaveState: this.props.navigation.state.params.SaveState,
          SaveAsyncStorage: this.props.navigation.state.params.SaveAsyncStorage,
          SetCompleteElement: this.props.navigation.state.params.SetCompleteElement
        }
      );
    }
  }

  SaveState(element,value)
  {
    this.props.navigation.state.params.SaveState(this.state.currentScreen,element,value);
  }

  render(){
    return(
      <View style={styles.container}>
        <Screen screen={ this.state.screens[this.state.currentScreen]} navigation={ this.props.navigation } SaveState={this.SaveState.bind(this)} />
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


