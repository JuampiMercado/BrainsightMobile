'use strict';
import React, {Component} from 'react';
import { StyleSheet, TextInput, TouchableHighlight, AsyncStorage, Text, View, Image,Dimensions,KeyboardAvoidingView,Keyboard, Picker,ScrollView } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker'
import RailsApi from '../Config.js'
import { StackNavigator } from 'react-navigation';

const ancho = Dimensions.get('window').width;
const alto = Dimensions.get('window').height;


class Register extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(){
    super();

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      gender: '',
      study: '',
      birthdate: '',
      errors: [],
      showProgress: false,
      studyOptions: ["Ninguno", "Primario Incompleto","Primario Completo","Secundario Incompleto",
        "Secundario Completo","Terciario Incompleto","Terciario Completo","Universitario Incompleto",
        "Universitario Completo"]
    }
  }

  async SaveUser(user) {
    try {
        await AsyncStorage.setItem('user', user);
    } catch(error) {
        console.log("[SaveUser|Register]: " + error);
    }
  }


  async onRegisterPressed() {
    this.setState({showProgress: true})
    try {
      Keyboard.dismiss();
      let response = await fetch(RailsApi('signup'), {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                user:{
                                  email: this.state.email,
                                  password: this.state.password,
                                  password_confirmation: this.state.password_confirmation,
                                  gender: this.state.gender,
                                  study: this.state.study,
                                  birthdate: this.state.birthdate,
                                }
                              })
                            });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
          //Handle success
          let user = res;
          //On success we will store the access_token in the AsyncStorage
          this.SaveUser(user);
          this.props.navigation.navigate("Main");
      } else {
          //Handle error
          let error = res;
          throw error;
      }
    } catch(errors) {
      //errors are in JSON form so we must parse them first.
      let formErrors = JSON.parse(errors);

      //We will store all the errors in the array.
      let errorsArray = [];
      for(var key in formErrors) {
        //If array is bigger than one we need to split it.
        if(formErrors[key].length > 1) {
            formErrors[key].map(error => errorsArray.push(`${key} ${error}`));
        } else {
            errorsArray.push(`${key} ${formErrors[key]}`);
        }
      }
      this.setState({errors: errorsArray})
      this.setState({showProgress: false});
    }
  }


  render() {
    return (
      <Image
          style={styles.image}
          source={require('../../images/fondoLogin.jpg')}
          >
      <ScrollView>
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../../images/logo.png')}/>
        </View>
        <Errors errors={this.state.errors}/>
        <TextInput
          onChangeText={ (text)=> this.setState({email: text}) }
          style={styles.input} placeholder="Email"
          keyboardType="email-address">

        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({password: text}) }
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}>
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({password_confirmation: text}) }
          style={styles.input}
          placeholder="Confirmar contraseña"
          secureTextEntry={true}>
        </TextInput>
        <View style={styles.input}>
        <Text style={styles.infoHeader}>Sexo</Text>
          <RadioForm
              formHorizontal={true}
              animation={false}
              radio_props={ [{label: 'Hombre' , value: 'H' }, {label: 'Mujer' , value: 'M' }]}
              initial={-1}
              onPress={(value) => {
                this.setState({gender: value})
              }}
              borderWidth={1}
              buttonSize={7}
              buttonOuterSize={15}
              buttonWrapStyle={{marginLeft: 5, marginRight:10}}
              buttonColor={'#000'}
              labelStyle={{paddingRight: 10}}
          >
          </RadioForm>
          </View>
          <View style={styles.input}>
          <Text style={styles.infoHeader}>Estudios</Text>
          <Picker
            selectedValue={this.state.study}
            mode="dropdown"
            onValueChange={(itemValue) => this.setState({study: itemValue})}>
            {this.state.studyOptions.map((item) => {
             return (<Picker.Item label={item} value={item} key={item}/>)
                            })}
          </Picker>
          </View>
          <View style={styles.input}>
          <Text style={styles.infoHeader}>Fecha de Nacimiento</Text>
          <DatePicker
            style={{width: 200}}
            date={this.state.birthdate}
            mode="date"
            androidMode="spinner"
            placeholder="Fecha"
            format="DD/MM/YYYY"
            minDate="01/01/1900"
            maxDate={Date.now.toString()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({birthdate: date})}}
          />
          </View>
        <TouchableHighlight onPress={this.onRegisterPressed.bind(this) } style={styles.buttonContainer}>
          <Text style={styles.buttonText}>
            Registrarse
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => {this.props.navigation.navigate('Home')}} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>
            Volver
          </Text>
        </TouchableHighlight>
      </KeyboardAvoidingView>
      </ScrollView>
      </Image>
    );
  }
}

const Errors = (props) => {
  return (
    <View>
      {props.errors.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: ancho,
    padding:20,
    paddingTop:20,
  },
  input: {
    //height:40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: 10,
    //color: '#FFF',
    paddingHorizontal: 10
  },
  heading: {
    fontSize: 30,
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  },
  buttonContainer:{
    backgroundColor:'#993366',
    paddingVertical: 15,
    marginBottom: 15
  },
  buttonText:{
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight:'700'
  },
  image:{
    flex: 1,
    width: ancho,
    opacity: 0.7 // 0.8
  },
  logoContainer: {
    alignItems:'center',
    flexGrow: 1,
    //justifyContent:'center',
    width: ancho,
    paddingTop:10,
    paddingBottom: 20
  },
  logo:{
    width: ancho,
    height:65,
    paddingLeft: 2
  },
});

export default Register
