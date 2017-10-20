import React from 'react';
import {View, Text,TextInput, StyleSheet } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { CheckBox,Slider } from 'react-native-elements'

export default class Question extends React.Component {

  constructor(props){
    super(props);
  }


  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.question !== nextState.question) {
      return true;
    }
    if (this.props.id !== nextState.id) {
      return true;
    }
    return false;
  }

  _SaveState(value)
  {
    var element = this.props.id;
    this.props._SaveState(element,value);
  }



  render(){
    return (
        <View>
          <Text key={'Text-' + this.props.id}>{this.props.question}</Text>
           <Answer {...this.props} SaveState={this._SaveState.bind(this)}  />
        </View>
    );
  }
}

class Answer extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    var response = '';
    switch(this.props.answer.type){
      case 'open':
        response = (<OpenAnswer {...this.props} />);
        break;
      case 'polar':
        response = (<TrueOrFalse {...this.props} />);
        break;
      case 'multiple':
        response = (<MultipleChoice {...this.props} />);
        break;
      case 'likert':
        response = (<Likert {...this.props} />);
        break;
      default:
        respose = (<Text></Text>);
        break;
    }


    return (<View>{response}</View>) ;
  }
};

//answer Object {bottomLabel: 'Insuficiente',choices: [], correctAnswer: null, hasCorrectAnswer: false, noLabel: 'No', steps: 5,
//topLabel: 'Excelente', type: 'polar', value:'Esta es una respuesta abierta', yesLabel:'Si'}

class OpenAnswer extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return <TextInput onChangeText={(value) => {this.props.SaveState(value)}} key={'TextInput-' + this.props.id} >{this.props.answer.value}</TextInput>
  }
}

class TrueOrFalse extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      answer: this.props.answer,//Object
      question:  this.props.answer.question,//string
      options: [{label: this.props.answer.noLabel , value: false }, {label: this.props.answer.yesLabel , value: true }],
      initial: ((this.props.answer.value != null && this.props.answer.value != undefined) ? (this.props.answer.value? 1 : 0) : false)
    }
  }
  render(){
    return (
      <View style={styles.radioButton}>
        <RadioForm
            formHorizontal={true}
            animation={false}
            radio_props={ this.state.options}
            initial={this.state.initial}
            onPress={(value) => {
              this.props.SaveState(value);
            }}
            borderWidth={1}
            buttonSize={10}
            buttonOuterSize={20}
            buttonWrapStyle={{marginLeft: 5, marginRight:10}}
            buttonColor={'#000'}
            labelStyle={{paddingRight: 10}}
        >
        </RadioForm>
      </View>
    );
  }
}

class MultipleChoice extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      answer: this.props.answer,//Object
      question:  this.props.answer.question,//string
      result: (this.props.answer.value.indexOf("Esta es una respuesta abierta") != -1 ? "" : this.props.answer.value),
      options: this.props.answer.choices,
    }
    this.ConcatAnswers = this.ConcatAnswers.bind(this);

  }

  ConcatAnswers(element,option,checked){
    var str = (this.state.result == undefined ? '': this.state.result);
    if(checked){
      //if is already inserted, don't insert again
      if( str.split('|').indexOf(option.label) == -1){
        str = str + option.label + '|';
      }
    }
    else{
      str = String(str).replace(option.label + '|','');
    }
    this.setState({result: str});
    this.props.SaveState(str);
  }

  render(){
    var options = this.state.options;
    return (
        <View>
            {options.map((element, i) =>{
                var array = (this.state.result != undefined && this.state.result != null)? this.state.result.split('|') : [];
                return(
                  <View style={styles.checkOptions} key={'CheckBox-' + i}>
                    <Check id={i} option={element} ConcatAnswers={this.ConcatAnswers} checked={(array.indexOf(element.label) != -1)}  />
                  </View>
                );
              })
            }
        </View>
    );
  }
}


class Check extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id:this.props.id,
      option: this.props.option,
      checked: ((this.props.checked != undefined && this.props.checked != null) ? this.props.checked : false)
    }
  }
  render(){
    return (
      <CheckBox
          key={this.state.id}
          left
          title={<Text style={styles.checkText}>{this.state.option.label}</Text>}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'
          checked={this.state.checked}
          containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
          uncheckedColor='#000'
          checkedColor='#000'
          onPress={
            () => {
              this.setState({checked: !this.state.checked});
              this.props.ConcatAnswers(this.state.id,this.state.option,!this.state.checked);
            }
          }
      />
    );
  }

}


class Likert extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      result: this.props.answer.value,
      options: this.props.options,
      value: ((this.props.answer.value == null || this.props.answer.value == undefined|| this.props.answer.value == '' || isNaN(this.props.answer.value)) ? 0 : this.props.answer.value)
    }
  }

  render(){
    const roundTo = require('round-to');
    return (
        <View style={styles.likert}>
          <Slider
            thumbTintColor='#F79B08'
            value={this.state.value}
            minimumValue={0}//{this.state.options[0]}
            maximumValue={this.props.answer.steps}
            step={1}
            onValueChange={
              (value) =>
              {
                this.setState({value: roundTo(value,2)});
                this.props.SaveState(roundTo(value,2));
              }
            }
            />
          <Text>Valor: {this.state.value}</Text>
        </View>
    );
  }
}



const styles= StyleSheet.create({
  radioButton:{
    marginTop: 20,
    marginLeft: 20
  },
  checkOptions:{
    marginBottom: -20,
  },
  checkText:{
    backgroundColor: 'transparent',
    marginLeft: 10,
    color: '#000'
  },
  likert:{
    marginTop: 40
  }
})
