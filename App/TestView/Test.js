import React from 'react';
import { View, Text,TouchableHighlight,StyleSheet, AsyncStorage } from 'react-native';
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

  async GetTest(){
     //Search test on AsyncStorage
     debugger;
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

  componentDidMount(){

  }

  render(){
    const { navigate } = this.props.navigation;
    return(
      <View style={styles.container}>
        <TouchableHighlight style={styles.testButton}
          onPress={ () => { navigate('StageManager',{ testID: this.state.test.id, stages: this.state.test.data, currentStage: 0}) } }
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
