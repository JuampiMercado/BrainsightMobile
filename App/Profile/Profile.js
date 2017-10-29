import React, { Component } from 'react';
import { View,StyleSheet,Text,Picker,TextInput,TouchableHighlight,Keyboard,AsyncStorage,Alert } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker'
import RailsApi from '../Config.js'
import { StackNavigator } from 'react-navigation';



export default class Profile extends React.Component {
  constructor(props){
    super(props);
    var user = this.props.navigation.state.params.user;
    this.state = {
      user: user,
      email: user.email,
      password: '',
      password_confirmation: '',
      gender: user.gender,
      study: user.study,
      birthdate: this._formatDate(user.birthdate),
      errors: [],
      studyOptions: ["Ninguno", "Primario Incompleto","Primario Completo","Secundario Incompleto",
        "Secundario Completo","Terciario Incompleto","Terciario Completo","Universitario Incompleto",
        "Universitario Completo"]


    }

  }
  static navigationOptions = () => ({
    title: 'Perfil',
    headerStyle: styles.mainHeader,
    headerTintColor: '#FFF'
  });

  componentWillMount(){
    Keyboard.dismiss();
  }

  async _persistChanges(){
    try {
      Keyboard.dismiss();
      let params = new Object();
      params.email = this.state.email;
      if( this.state.password != '' && this.state.password != undefined && this.state.password != null )
      {
        params.password= this.state.password;
        params.password_confirmation= this.state.password_confirmation;
      }
      params.gender= this.state.gender;
      params.study= this.state.study;
      params.birthdate= this.state.birthdate;

      let response = await fetch(RailsApi('updateUser'), {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: params
        })
      });
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
          //Handle success
          let user = res;
          //On success we will store the access_token in the AsyncStorage
          Alert.alert('Su información de perfil ha sido modificada','Por favor vuelva a ingresar a la aplicación',
            [ {text: 'Continuar', onPress: () => this._onLogoutClick()} ],
            { cancelable: false }
          )
      } else {
          //Handle error
          let error = res;
          throw error;
      }
    } catch(errors) {
      //errors are in JSON form so we must parse them first.
      let formErrors = JSON.parse(errors);
      let errorsArray = [];
      for(var key in formErrors) {
        //If array is bigger than one we need to split it.
        if(formErrors[key].length > 1) {
            formErrors[key].map(error => errorsArray.push(`${key} ${error}`));
        } else {
            errorsArray.push(`${key} ${formErrors[key]}`);
        }
      }
      this.setState({errors: ['Asegurese de que todos los campos esten completos']})
    }
  }

  _formatDate(date){
    var date = new Date(date);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return day + "/" + month + "/" + year;
  }

  _onLogoutClick(){
    AsyncStorage.removeItem('user');
    this.props.navigation.navigate('Home');
  }

  ValidDate(date){
    var aux = date.split('/');
    if(new Date() < new Date(aux[2],Number(aux[1])-1,aux[0]))
    {
      Alert.alert('La fecha no puede ser mayor al día de hoy',
            [ {text: 'Continuar', onPress: () => {var a = new Date();
                    this.setState({birthdate: a.getDate() + '/' + a.getMonth() + 1 + '/' + a.getFullYear()});}} ],
            { cancelable: false }
          )
      return false;
    }
    else{
      this.setState({birthdate: date});
    }
    return true;
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Información Personal</Text>
        </View>
        <Errors errors={this.state.errors}/>
        <View style={styles.infoContainer}>
          <TextInput
            onChangeText={ (text)=> this.setState({email: text}) }
            style={styles.input} placeholder="Email"
            value={this.state.email}
            keyboardType="email-address"
            >
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
          <View style={styles.itemInfo}>
          <Text style={styles.infoHeader}>Sexo</Text>
          <RadioForm
              formHorizontal={true}
              animation={false}
              radio_props={ [{label: 'Hombre' , value: 'H' }, {label: 'Mujer' , value: 'M' }]}
              initial={(this.state.gender == 'H' ? 0 : 1)}
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
          </ View>
          <View >
            <Text style={styles.infoHeader}>Estudios</Text>
            <Picker
              selectedValue={this.state.study}
              mode="dropdown"
              onValueChange={(itemValue) => this.setState({study: itemValue})}>
              {this.state.studyOptions.map((item) => {
              return (<Picker.Item label={item} value={item} key={item}/>)
                              })}
            </Picker>
          </View >
          <View >
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
              }}
              onDateChange={(date) => {
                  var aux = date.split('/');
                  var now = new Date();
                  if(now < new Date(aux[2],Number(aux[1])-1,aux[0]))
                  {
                    var month = Number(now.getMonth()) + 1;
                    var a = now.getDate() + '/' + month + '/' + now.getFullYear();
                    this.setState({birthdate: a});
                  }
                  else{
                    this.setState({birthdate: date});
                  }

                }
              }
            />
          </View>
        </View>
        <TouchableHighlight
          style={styles.touchable}
          onPress={this._persistChanges.bind(this)}
        >
          <Text style={styles.textButton}>Guardar Cambios</Text>
        </TouchableHighlight>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Cerrar sesión en el dispositivo</Text>
        </View>
        <TouchableHighlight
          style={styles.touchable}
          onPress={this._onLogoutClick.bind(this)}
        >
          <Text style={styles.textButton}>Cerrar Sesión</Text>
        </TouchableHighlight>
      </View>
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

const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop:20,
  },
  error: {
    color: 'red',
    paddingTop: 10,
    paddingLeft: 20,
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
    paddingBottom: 20
  },
  infoHeader: {
    paddingBottom: 5,

  },
  info: {
    color: '#000000'
  },
  itemInfo:{
    backgroundColor: '#FFF'
  },
  touchable:{
    marginTop: 20,
    marginBottom: 40,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center'
  },
  textButton:{
    fontWeight:'bold',
    color: '#000000'
  },
})

