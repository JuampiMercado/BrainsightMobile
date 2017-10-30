import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight, AsyncStorage, Alert, ScrollView, Dimensions, ListView, Keyboard } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MainHeader from './MainHeaderNav'
import MainFooter from './MainFooterNav'
import RailsApi from '../Config';
import PTRView from 'react-native-pull-to-refresh';
import BackHandlerAndroid from '../Handlers/BackHandlerAndroid'
import DeepLinking from '../DeepLinking'

const { height, width } = Dimensions.get('window');

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    var linkID = true;
    try { linkID = this.props.navigation.state.params.linkID; }
    catch (err) { }
    this.state = {
      testsList: [],
      user: null,
      error: "",
      refreshing: false,
      linkID: linkID,
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    }
    this._goToTest = this._goToTest.bind(this);

    // Use for testing and developing, enable to redo a test
    AsyncStorage.removeItem('test-56');
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Bienvenido',
    headerLeft: null,
    headerRight: (<MainHeader navigation={navigation} />),
    headerStyle: styles.mainHeader,
    headerTintColor: '#FFF',
  });

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.testsList !== nextState.testsList) {
      return true;
    }
    if (this.state.user !== nextState.user) {
      return true;
    }
    return false;
  }

  componentWillMount() {
    Keyboard.dismiss();
    this._getUser();
    
  }

  

  _refresh = () => {
    return new Promise((resolve) => {
      this.setState({ testsList: [], error: "" });
      this._fetchListOfTests(3, this.state.user.id);
      setTimeout(() => { resolve() }, 2000)
    });
  }

  async _getUser() {
    try {
      let user = await AsyncStorage.getItem('user');
      if (user != null && user != undefined && user != null) {
        this.setState({ user: JSON.parse(user) });
        this.props.navigation.setParams({
          user: JSON.parse(user)
        })
        this._fetchListOfTests(3, JSON.parse(user).id);
        return JSON.parse(user);
      }
      else {
        this.props.navigation.navigate('Home');
      }
    } catch (error) {
      this.props.navigation.navigate('Home');
    }
  }

  _goToTest(test) {
    //Add completed property to stages and screens before execute test.
    test = this._setCompletedProperty(test);
    console.log('[_goToTest|Main]:')
    console.log(test);
    if (test) {
      this.props.navigation.navigate('Test', { test: test, user: this.state.user })
    }
  }

  async _getTest(id) {
    var exists = await this._existResult(id);
    if (exists) {
      Alert.alert('No se puede acceder', 'Usted ya ha realizado este test anteriormente. Muchas gracias por su colaboración.',
        [{ text: 'Continuar', onPress: () => this.setState({ linkID: false }) },],
        { cancelable: false }
      )
    }
    else {
      var test = await this._fetchTest(id);
      var isPublished = await this._isPublished(test);
      if(!isPublished) return false;
      if (test && test != undefined) {
        this._goToTest(test);
      }
    }

  }

  async _linkToTest(id) {
    //This function is calling by the component DeepLinking
    //I must manage redirection with linkID because it's entering on loop
    if (this.state.linkID) {
      this._getTest(id);
    }
  }

  _existResult(testid) {
    return this._fetchResult(this.state.user.id, testid);
  }
  _isPublished(test){
    if (!test.isPublished){
      //El test ya no esta publicado, entonces lo elimino del storage, y no lo dejo ingresar
      AsyncStorage.removeItem('test-' + test.id);
      Alert.alert('No se puede acceder', 'El test no se encuentra disponible para su ejecución.',
        [{ text: 'Continuar', onPress: () => this.props.navigation.navigate('Main') },],
        { cancelable: false }
      )
    }
    return test.isPublished;
  }

  _setCompletedProperty(test) {
    if (test.data) {
      test.data.map((stage, i) => {
        stage.completed = false;
        stage.screens.map((screen, j) => {
          screen.completed = false;
        });
      });
      return test;
    }
    else {
      Alert.alert('Error en el test', 'El test tiene un error y no puede iniciarse.')
      return null;
    }
  }

  async _fetchListOfTests(intentos, userid) {
    console.log('userid');
    console.log(userid);
    if (intentos == 0) {
      this.setState({ error: 'No se han podido descargar test. Por favor, intentelo de nuevo más tarde.' })
      return;
    }
    try {
      let response = await fetch(RailsApi('tests'), {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userid: userid
        }),
      });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({ testsList: JSON.parse(res), dataSource: ds.cloneWithRows(JSON.parse(res)) });
      } else {
        let error = res;
        throw error;
      }
    } catch (error) {
      this._fetchListOfTests(intentos - 1, userid);
    }
  }

  async _fetchTest(id) {
    try {
      let response = await fetch(RailsApi('test'), {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id
        }),
      });

      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        return JSON.parse(res);
      } else {
        let error = res;
        Alert.alert(error, 'El test puede que no este disponible en este momento.');
        return null;
      }
    } catch (error) {
      console.log('[_fetchTest|Main]:' + error);
    }
  }

  async _fetchResult(userid, testid) {
    var exists = true;
    try {
      let response = await fetch(RailsApi('existResult'), {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userid,
          test_id: testid
        }),
      });

      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        exists = res == "true";
      } else {
        let error = res;
        throw error;
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Se ha producido un error, por favor, intentelo nuevamente mas tarde',
        [
          //{text: 'Continuar', onPress: () => this.props.navigation.navigate('Main',{linkID: false})},
          { text: 'Continuar', onPress: () => this.setState({ linkID: false }) },

        ],
        { cancelable: false }
      )
      console.log(error);
    }
    console.log(exists);
    return exists;
  }


  render() {
    return (
      <View style={styles.container}>
        <DeepLinking linkToTest={this._linkToTest.bind(this)} />
        <BackHandlerAndroid />
        <PTRView onRefresh={this._refresh} >
          <ScrollView style={styles.main}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Seleccione un test</Text>
            </View>
            <Text style={styles.error}>
              {this.state.error}
            </Text>

            <ListView style={styles.listView}
              dataSource={this.state.dataSource}
              renderRow={(test) =>
                <View style={styles.testContainer} key={test.id}>
                  <TouchableHighlight style={styles.testButton}
                    onPress={() => { this._getTest(test.id) }}
                  >
                    <Text style={styles.textButton}>{test.name} </Text>
                  </TouchableHighlight>
                </View>
              }
            />
          </ScrollView>
        </PTRView>

        <View style={styles.bottomNav}>
          <MainFooter navigation={this.props.navigation} _getTest={this._getTest.bind(this)} />
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  mainHeader: {
    backgroundColor: '#000000',
  },
  main: {
    marginBottom: 65,
  },
  titleContainer: {
    borderColor: '#000000',
    borderBottomWidth: 1,
    margin: 10
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15
  },
  testContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  testButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    marginTop: 15,
    padding: 15,
  },
  textButton: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#FFF'
  },
  error: {
    color: 'red',
    paddingTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  bottomNav: {
    backgroundColor: '#000000',
    position: 'absolute',
    bottom: 0,
    height: 40,
  }
})





/*

//BASIC STRUCTURE
//test
var test = new Object();
var element = new Object();
test.data = []; //data es el campo del json de la base. Va a ser un array de stages
//etapas
element.type = 'stage';
element.screens = []
//element.config = {  configuraciones };
element.completed = false;
//pantallas
element.type = 'screen';
element.elements = [];
//element.config = { configuraciones };
element.completed = false;
//elementos
element.type = 'text';
element.config = { text: null, size: null, color: null };
element.type = 'question';
element.config = { question: null, result: null, type: null, options: [] };
element.type = 'image';
element.config = { source: null };
element.type = 'video';
element.config = { source: null };
element.type = 'audio';
element.config = { source: null };


var element1 = new Object();
element1.type ='question';
element1.config = { question: '¿Argentina esta clasificada para el mundial?', result: '', type: 'tof', options: [] };
element1.sensors = { reaction: null, accelerometer: null, gyroscope: null, magnetometer: null, thermometer: null, lightSensor: null }
var element2 = new Object();
element2.type ='question';
element2.config = { question: '¿Argentina le gana a Perú?', result: '', type: 'mc', options: ['Si','No','Resuciten a Don Julio'] };
element2.sensors = { reaction: null, accelerometer: null, gyroscope: null, magnetometer: null, thermometer: null, lightSensor: null }
var element3 = new Object();
element3.type ='question';
element3.config = { question: '¿Que tanto te gusta como juega la selección?', result: '', type: 'likert', options: [0,10,0.1] };
element3.sensors = { reaction: null, accelerometer: null, gyroscope: null, magnetometer: null, thermometer: null, lightSensor: null }
var element4 = new Object();
element4.type ='question';
element4.config = { question: '¿Esta es la cuarta pregunta?', result: '', type: 'open', options: [] };
element4.sensors = { reaction: null, accelerometer: null, gyroscope: null, magnetometer: null, thermometer: null, lightSensor: null }
var element5 = new Object();
element5.type ='question';
element5.config = { question: '¿Esta es la quinta pregunta?', result: '', type: 'open', options: [] };
element5.sensors = { reaction: null, accelerometer: null, gyroscope: null, magnetometer: null, thermometer: null, lightSensor: null }
var element6 = new Object();
element6.type ='text';
element6.config = { text: '¡Esto es un texto carajo!', color: 'red', size: 25 };
var element7 = { type: 'image', config: { source: 'https://i2.wp.com/hipertextual.com/files/2015/10/conectoma-cerebro.jpg?resize=670%2C413&ssl=1' }};
var element8 = { type: 'video', config: { source: 'https://vjs.zencdn.net/v/oceans.mp4' }};
var screen1 = { type: 'screen', elements: [element1], config: null };
var screen7 = { type: 'screen', elements: [element2], config: null };
var screen2 = { type: 'screen', elements: [element3], config: null };
var screen3 = { type: 'screen', elements: [element4], config: null };
var screen4 = { type: 'screen', elements: [element5,element6], config: null };
var screen5 = { type: 'screen', elements: [ element7], config: null};
var screen6 = { type: 'screen', elements: [ element8], config: null};
var stage1 = { type: 'stage', screens: [screen1,screen7,screen2], config: null };
var stage2 = { type: 'stage', screens: [screen3,screen4], config: null };
var stage3 = { type: 'stage', screens: [screen5, screen6], config:null }
var prueba = { id: 2, name: 'Object Prueba', data: [stage1, stage2,stage3] };


*/


/* Primer ejemplo
var question1 = new Object();
question1.question= '¿Esta es la primer pregunta?';
question1.answer = '';
var question2 = new Object();
question2.question= '¿Esta es la segunda pregunta?';
question2.answer = '';
var question3 = new Object();
question3.question= '¿Esta es la tercer pregunta?';
question3.answer = '';
var Stage1 = new Object();
Stage1.config = null;
Stage1.data = [question1,question2];
var Stage2 = new Object();
Stage2.config = null;
Stage2.data = [question3];
var TestObject = new Object();
TestObject.data = [Stage1,Stage2];
var ArrStages= [Stage1,Stage2];
*/


// ESTA ES LA SEGUNDA DEFINICION
// /*Base Structure*/
// var test = new Object();
// //El objeto test que viene de la API tiene muchos atributos, uno es el data que es el JSON.
// //Una vez parseado podria ser de esta forma
// test.stages = []; //Array of stages
// var stage = new Object();
// stage.type = 'stage';
// stage.configuration = { }; //Aca irian las configuraciones del stage
// stage.screens = []; //Array of screens.
// var screen = new Object();
// screen.type = 'screen';
// screen.configuration = {}; //Configuraciones de pantalla si las hay, sino se saca.
// screen.elements = []; //Array of elements.

// //Elements
// //El atributo header de los elementos seria la pregunta,texto o imagen/video/audio(una url) en cuestion
// //El atributo value seria el input del sujeto de prueba que se tiene que guardar en los resultados del test.
// //Las propertys son configuraciones propias de cada elemento.
// var text = new Object();
// text.type = 'text';
// text.propertys = { size: null, color: null };
// text.header = null;
// var question = new Object();
// question.type = 'question';
// //questionType: Abierta,V/F, Multiple Choice, likert. Options: Define las preguntas, o rango en caso de likert.
// question.propertys= { questionType: null, options: null }
// question.header = null;
// question.value = null;
// var image = new Object();
// image.type = 'image';
// image.header = null; //Es una url
// var audio = new Object();
// audio.type = 'audio';
// audio.header = null; //Es una url
// var video = new Object();
// video.type = 'video';
// video.header = null; //Es una url

// element.type = ''//aca define el type
// //y para cada caso
// element.configuration = {};
// element.image.source= '';
// element.video.source= '';
// element.audio.source= '';
// element.text.value = '';
// element.question.type = '';//Tipo de pregunta
// element.question.options = [];
// element.question.value = '';
// element.question.answer = '';
