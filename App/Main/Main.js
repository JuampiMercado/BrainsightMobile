import React, { Component } from 'react';
import { Text,View,StyleSheet,TouchableOpacity,AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MainHeader from './MainHeaderNav'
import RailsApi from '../Config';
import PTRView from 'react-native-pull-to-refresh';

export default class Main extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      testsList: [],
      user: "",
      error: "",
      refreshing: false,

    }
    this.GetUser();
    this.GetTests(3);
  }

  _refresh= () => {
    return new Promise((resolve) => {
      this.setState({testsList: [], user: "", error: ""});
      this.GetUser();
      this.GetTests(3);
      setTimeout(()=>{resolve()}, 2000)
    });
  }

  static navigationOptions = ({ navigation }) => ({
    title: '',
    headerLeft: null,
    headerRight: ( <MainHeader navigation={navigation} /> ),
    headerStyle: styles.mainHeader,
    headerTintColor: '#FFF',
  });

  async GetUser(){
    let user = await AsyncStorage.getItem('User');
    if (user){
      this.setState({user: JSON.parse(user)});
    }
    else{
      this.props.navigation.navigate('Home');
    }
  }

  async GetTests(intentos) {
    if (intentos == 0){
      this.setState({error: 'No se han podido descargar test. Por favor, intentelo de nuevo más tarde.'})
      return;
    }

    try {
      let response = await fetch(RailsApi('test'), {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: this.state.user.id
          }),
        });

      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
          this.setState({testsList: JSON.parse(res)});
      } else {
          let error = res;
          throw error;
      }
    } catch(error) {
        this.GetTests(intentos-1);
    }
  }


  render(){
    const { navigate } = this.props.navigation;
    var user = this.state.user;
    return(
        <PTRView onRefresh={this._refresh} >
          <View style={styles.titleContainer}>
              <Text style={styles.title}>Seleccione un test</Text>
          </View>
          <Text style={styles.error}>
            {this.state.error}
          </Text>
          <View>
          {this.state.testsList.map(function(test, i){
              return(
                <View style={styles.testContainer} key={test.id}>
                  <TouchableOpacity style={styles.testButton}
                    onPress={ () => { navigate('Test',{ test: test, user: user}) } }
                    >
                    <Text style={styles.textButton}>{test.name} </Text>
                  </TouchableOpacity>
                </View>
              );
            })
          }
          </View>
        </PTRView>
    );
  }
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',//'#993366',
  },
  mainHeader: {
     backgroundColor: '#000000',
  },
  titleContainer:{
    borderColor: '#000000',
    borderBottomWidth: 1,
    margin: 10
  },
  title:{
    fontWeight: 'bold',
    fontSize: 15
  },
  testContainer:{
     marginLeft: 10,
     marginRight: 10
  },
  testButton:{
    backgroundColor:'#000000',
    paddingVertical: 15,
    marginTop: 15,
    padding: 15,
  },
  textButton:{
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#FFF'
  },
  error: {
    color: 'red',
    paddingTop: 10,
    marginLeft: 10,
    marginRight: 10
  }
})



