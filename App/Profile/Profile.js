import React, { Component } from 'react';
import { View,StyleSheet,Text,TouchableHighlight,Keyboard } from 'react-native';
import RailsApi from '../Config.js'
import { StackNavigator } from 'react-navigation';



export default class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      last_name: '',
//Change password?????? I don't know how to do it with Device(Rails)
    }

  }
  static navigationOptions = () => ({
    title: 'Perfil',
    headerStyle: styles.mainHeader,
    headerTintColor: '#FFF'
  });

  async _persistChanges(){
    var userInfo = { name: this.state.name, last_name: this.state.last_name};
    try {
      Keyboard.dismiss();
      let response = await fetch(RailsApi(''), {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                user: userInfo
                              })
                            });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
          //Handle success
          let user = res;
          //On success we will store the access_token in the AsyncStorage
          this.props.navigation.navigate("Main");
      } else {
          //Handle error
          let error = res;
          throw error;
      }
    } catch(errors) {
      //errors are in JSON form so we must parse them first.
      let formErrors = JSON.parse(errors);
      this.setState({errors: errorsArray})
    }
  }
  
  _onLogoutClick(){
    AsyncStorage.removeItem('user');
    this.props.navigation.navigate('Home');
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Información Personal</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoHeader}>Nombre </Text>
          <Text style={styles.info}>{user.name} </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoHeader}>Apellido</Text>
          <Text style={styles.info}>{user.last_name}</Text>
        </View>
        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={this._persistChanges.bind(this)}
        >
          <Text style={styles.buttonText}>Guardar Cambios</Text>
        </TouchableHighlight>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Cerrar sesión en el dispositivo</Text>
        </View>
        <TouchableHighlight
          style={styles.buttonContainer}
          onPress={this._onLogoutClick.bind(this)}
        >
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableHighlight>
      </View>
    );

  }
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop:20
  },
  mainHeader: {
     backgroundColor: '#000000',
  },
  titleContainer:{
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  title:{
    fontWeight: 'bold',
    fontSize: 15
  },
  infoContainer:{
    borderBottomWidth: 1,
    padding: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  infoHeader: {
    paddingBottom: 5,
  },
  info: {
    color: '#000000'
  }
})

