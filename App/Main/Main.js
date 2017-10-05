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
                    onPress={ () => { navigate('Test',{ test: prueba, user: user}) } }
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





//BASIC STRUCTURE
//test
var test = new Object();
var element = new Object();
test.data = []; //data es el campo del json de la base. Va a ser un array de stages
//etapas
element.type = 'stage';
element.screens = []
element.config = { /* configuraciones*/ };
//pantallas
element.type = 'screen';
element.elements = [];
element.config = { /*configuraciones*/ };
//elementos
element.type = 'text';
element.config = { text: null, size: null, color: null };
element.type = 'question';
element.config = { question: null, answer: null, type: null, options: [] };
element.type = 'image';
element.config = { source: null };
element.type = 'video';
element.config = { source: null };
element.type = 'audio';
element.config = { source: null };


var element1 = new Object();
element1.type ='question';
element1.config = { question: '¿Esta es la primera pregunta?', answer: '', type: 'open', options: [] };
var element2 = new Object();
element2.type ='question';
element2.config = { question: '¿Esta es la segunda pregunta?', answer: '', type: 'open', options: [] };
var element3 = new Object();
element3.type ='question';
element3.config = { question: '¿Esta es la tercera pregunta?', answer: '', type: 'open', options: [] };
var element4 = new Object();
element4.type ='question';
element4.config = { question: '¿Esta es la cuarta pregunta?', answer: '', type: 'open', options: [] };
var element5 = new Object();
element5.type ='question';
element5.config = { question: '¿Esta es la quinta pregunta?', answer: '', type: 'open', options: [] };
var element6 = new Object();
element6.type ='text';
element6.config = { text: '¡Esto es un texto carajo!', color: 'red', size: 25 };
var element7 = { type: 'image', config: { source: 'https://i2.wp.com/hipertextual.com/files/2015/10/conectoma-cerebro.jpg?resize=670%2C413&ssl=1' }};
var element8 = { type: 'video', config: { source: 'https://vjs.zencdn.net/v/oceans.mp4' }};
var screen1 = { type: 'screen', elements: [element1,element2], config: null };
var screen2 = { type: 'screen', elements: [element3], config: null };
var screen3 = { type: 'screen', elements: [element4], config: null };
var screen4 = { type: 'screen', elements: [element5,element6], config: null };
var screen5 = { type: 'screen', elements: [ element7], config: null};
var screen6 = { type: 'screen', elements: [ element8], config: null};
var stage1 = { type: 'stage', screens: [screen1,screen2], config: null };
var stage2 = { type: 'stage', screens: [screen3,screen4], config: null };
var stage3 = { type: 'stage', screens: [screen5, screen6], config:null }
var prueba = { data: [stage1, stage2,stage3] };





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
