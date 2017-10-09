import React from 'react';
import { View, Text,TouchableHighlight,StyleSheet, AsyncStorage,Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import RailsApi from '../Config';



export default class Test extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      test: this.props.navigation.state.params.test,
      user: this.props.navigation.state.params.user
    }
    this.GetTest();
  }

  static navigationOptions = ({ navigation }) => ({
    title: '',
    headerStyle: styles.mainHeader,
    headerTintColor: '#FFF',
  });

  componentWillMount(){
    this.FetchResult(3);
  }

  async GetTest(){
     //Search test on AsyncStorage
    var test = this.state.test;
    try {
      let storTest = await AsyncStorage.getItem('test-' + this.state.test.id);
      if (!storTest) {
        console.log("Token not set");
      } else {
        if (storTest != null && storTest != undefined){
          test.data = JSON.parse(storTest);
          this.setState({test: test});
        }
      }
    } catch (error) {
      console.log("Something went wrong");
    }
    return test;
  }



  async FetchResult(intentos){
    if (intentos == 0){
      Alert.alert(
        'Error',
        'Se ha producido un error, por favor, intentelo nuevamente mas tarde',
        [
          {text: 'Continuar', onPress: () => this.props.navigation.navigate('Main', {user: this.state.user})},

        ],
        { cancelable: false }
      )
      return;
    }
    try {
      let response = await fetch(RailsApi('existResult'), {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: JSON.parse(this.state.user).id
          }),
        });

      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
          var exists = JSON.parse(res);
          if(exists){
            Alert.alert(
              'Error',
              'Usted ya ha realizado este test anteriormente. Muchas gracias por su colaboración.',
              [
                {text: 'Continuar', onPress: () => this.props.navigation.navigate('Main', {user: this.state.user})},

              ],
              { cancelable: false }
            )
          }
      } else {
          let error = res;
          throw error;
      }
    } catch(error) {
        this.FetchResult(intentos-1);
    }
  }

  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}>
        <TouchableHighlight style={styles.testButton}
          onPress={ () => { navigate('StageManager',{ user: this.state.user, testID: this.state.test.id, stages: this.state.test.data, currentStage: 0}) } }
          >
          <Text style={styles.textButton}>¡Empezar! </Text>
        </TouchableHighlight>
      </View>
      );
  }
}


const styles= StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,

  },
  mainHeader: {
     backgroundColor: '#000000',
  },
  testButton:{
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
