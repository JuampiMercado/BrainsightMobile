import React from 'react';
import {View, Text,TextInput, StyleSheet } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { CheckBox,Slider } from 'react-native-elements'

export default class Question extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      question: this.props.question,
      answer: this.props.answer,
      type: this.props.type,
      options: this.props.options,
    }
  }

  SaveState(value)
  {
    var element = this.props.id;
    this.props.SaveState(element,value);
  }

  render(){
    return (
        <View>
          <Text key={'Text-' + this.state.id}>{this.state.question}</Text>
          {/* <Answer id={this.state.id} answer={this.state.answer} type={this.state.type} options={this.state.options} SaveState={this.SaveState.bind(this)} /> */}
          <Answer {...this.state} SaveState={this.SaveState.bind(this)} />
        </View>
    );
  }
}

class Answer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      answer: this.props.answer,
      type: this.props.type,
      options: this.props.options,
      SaveState: this.props.SaveState
    }
  }
  /*
    type: open, tof(true or false), mc(multiple choice), likert
  */
  render(){
    var response = '';
    switch(this.state.type){
      case 'open':
        response = (<OpenAnswer {...this.state} />);
        break;
      case 'tof':
        response = (<TrueOrFalse {...this.state} />);
        break;
      case 'mc':
        response = (<MultipleChoice {...this.state} />);
        break;
      case 'likert':
        response = (<Likert {...this.state} />);
        break;
    }


    return (<View>{response}</View>) ;
  }
};



class OpenAnswer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      answer: this.props.answer
    }
  }
  render(){
    return <TextInput
      onChangeText={(value) => {this.props.SaveState(value)}}
    key={'TextInput-' + this.state.id} >{this.state.answer}</TextInput>
  }
}

class TrueOrFalse extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      id: this.props.id,
      answer: this.props.answer
    }
  }
  render(){
    var radio_props = [
      {label: 'Falso', value: false },
      {label: 'Verdadero', value: true }
    ];
    //Inicia en false, asi que lo pongo en false
    return (
      <View style={styles.radioButton}>
        <RadioForm
            formHorizontal={true}
            animation={true}
            radio_props={radio_props}
            initial={false}
            onPress={(value) => {
              this.setState({value:value});
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
      answer: this.props.answer,
      options: this.props.options,
    }
    this.ConcatAnswers = this.ConcatAnswers.bind(this);
  }

  ConcatAnswers(element,option,checked){
    var str = (this.state.answer == undefined ? '': this.state.answer);
    if(checked)
      str = str + option + '|';
    else
      str = String(str).replace(option + '|','');
    this.setState({answer: str});
    this.props.SaveState(str);
  }

  render(){
    var options = this.state.options;
    return (
        <View>
            {options.map((element, i) =>{
                return(
                  <View style={styles.checkOptions} key={'CheckBox-' + i}>
                    <Check id={i} option={element} ConcatAnswers={this.ConcatAnswers}  />
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
      checked: false
    }
  }
  render(){
    return (
      <CheckBox
          key={this.state.id}
          left
          title={<Text style={styles.checkText}>{this.state.option}</Text>}
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
      answer: this.props.answer,
      options: this.props.options,
      value: 0
    }
  }

  render(){
    const roundTo = require('round-to');
    var options = this.state.options;
    return (
        <View style={styles.likert}>
          <Slider
            thumbTintColor='#F79B08'
            value={this.state.value}
            minimumValue={this.state.options[0]}
            maximumValue={this.state.options[1]}
            step={this.state.options[2]}
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
