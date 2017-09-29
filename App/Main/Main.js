import React, { Component } from 'react';
import { Text,View,StyleSheet,TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MainHeader from './MainHeaderNav'

export default class Main extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: '',
    headerRight: ( <MainHeader navigation={navigation} /> ),
    headerStyle: styles.mainHeader,
    headerTintColor: '#FFF'

  });

  render(){

    const { navigate } = this.props.navigation;
    return(

      <View style={styles.container}>
        <Text>Esta es la página principal!</Text>
      </View>
    );

  }
}


  var obj = new Object();
  obj.name ='Juan Pablo';
  obj.last_name ='Mercado';
  obj.email = 'juampimercado@hotmail.com';
  obj.gender = 'Male';
  obj.DNI = '123456789';
  obj.location = 'Buenos Aires';
  obj.age = '25';
  //var user =
  //var user = JSON.stringify({name: 'Juan Pablo', last_name:'Mercado', email: 'juampimercado@hotmail.com', gender: 'Male', address: 'Calle falsa 123'})
  var jsonUser = JSON.stringify(obj);




const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',//'#993366',
  },
  mainHeader: {
     backgroundColor: '#000000',
  },

})

export { jsonUser };
