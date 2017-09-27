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



const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#993366',
  },
  mainHeader: {
     backgroundColor: '#000000',
  },

})

