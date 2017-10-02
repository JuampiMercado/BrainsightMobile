import React, { Component } from 'react';
import { View,StyleSheet,Text } from 'react-native';
import { jsonUser } from '../Main/Main'

//var user = JSON.parse(jsonUser);

export default class Profile extends React.Component {
  static navigationOptions = () => ({
    title: 'Perfil',
    headerStyle: styles.mainHeader,
    headerTintColor: '#FFF'
  });
  render(){
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
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

