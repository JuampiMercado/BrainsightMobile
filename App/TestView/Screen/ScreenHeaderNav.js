import React, { Component } from 'react';
import { Text,View,StyleSheet,TouchableHighlight, AsyncStorage,Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class ScreenHeaderNav extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      navigation: this.props.navigation,
      position: this.props.position == undefined ? 'right' : this.props.position
    }
  }
  render(){
    element = null;
    switch(this.state.position)
    {
      case 'left':
        element = <ScreenLeftNav {...this.state} />
        break;
      case 'right':
        element = <ScreenRightNav {...this.state} />
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
    AsyncStorage.removeItem('test-' + this.props.navigation.state.params.testID);
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
    this.props.navigation.state.params.SaveAsyncStorage(this.props.navigation.state.params.testID)
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
